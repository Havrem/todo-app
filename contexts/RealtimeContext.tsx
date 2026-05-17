import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { api } from "@/api/client";
import { useSession } from "@/contexts/SessionContext";

type Handler = (payload: unknown) => void;
type Registered = { destination: string; handler: Handler };

type RealtimeContextType = {
    subscribe: (destination: string, handler: Handler) => () => void;
};

const RealtimeContext = createContext<RealtimeContextType | null>(null);

export function useRealtime() {
    const context = useContext(RealtimeContext);
    if (!context) throw new Error("useRealtime must be used within RealtimeProvider");
    return context;
}

function buildWsUrl(token: string): string {
    if (!token) throw new Error("buildWsUrl called without a token");
    // Strip a trailing /api (if any) before swapping protocol and appending /ws.
    const base = (api.defaults.baseURL ?? "").replace(/\/api\/?$/, "");
    return base.replace(/^http/, "ws") + "/ws?access_token=" + encodeURIComponent(token);
}

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
    const { token } = useSession();
    const clientRef = useRef<Client | null>(null);

    // Desired subscriptions (what components want to be subscribed to).
    const registeredRef = useRef<Map<number, Registered>>(new Map());
    // Live STOMP subscriptions by registration id. Recreated on reconnect.
    const activeRef = useRef<Map<number, StompSubscription>>(new Map());
    const nextIdRef = useRef(0);

    const attachOne = (client: Client, registered: Registered): StompSubscription => {
        return client.subscribe(registered.destination, (message: IMessage) => {
            try {
                registered.handler(JSON.parse(message.body));
            } catch {
                // Ignore malformed realtime payloads.
            }
        });
    };

    const attachAll = (client: Client) => {
        activeRef.current.forEach((sub) => sub.unsubscribe());
        activeRef.current.clear();
        registeredRef.current.forEach((reg, id) => {
            activeRef.current.set(id, attachOne(client, reg));
        });
    };

    useEffect(() => {
        if (!token) {
            clientRef.current?.deactivate();
            clientRef.current = null;
            activeRef.current.clear();
            return;
        }

        const client = new Client({
            brokerURL: buildWsUrl(token),
            connectionTimeout: 8000,
            reconnectDelay: 3000,
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,
            forceBinaryWSFrames: true,
            appendMissingNULLonIncoming: true,
            discardWebsocketOnCommFailure: true,
            onConnect: () => {
                attachAll(client);
            },
            onDisconnect: () => {
                activeRef.current.clear();
            },
            onWebSocketClose: () => {
                activeRef.current.clear();
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
            clientRef.current = null;
            activeRef.current.clear();
        };
    }, [token]);

    const subscribe = useCallback((destination: string, handler: Handler) => {
        const id = ++nextIdRef.current;
        const registered: Registered = { destination, handler };
        registeredRef.current.set(id, registered);

        const client = clientRef.current;
        if (client?.connected) {
            activeRef.current.set(id, attachOne(client, registered));
        }

        return () => {
            registeredRef.current.delete(id);
            activeRef.current.get(id)?.unsubscribe();
            activeRef.current.delete(id);
        };
    }, []);

    const value = useMemo(() => ({ subscribe }), [subscribe]);

    return (
        <RealtimeContext.Provider value={value}>
            {children}
        </RealtimeContext.Provider>
    );
}
