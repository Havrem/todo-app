import { LoginData, LoginResponse, RegisterData, RegisterResponse } from '@/schemas/auth';
import { List, ListItem, ListSummary } from '@/schemas/list';
import { User } from '@/schemas/user';
import { delay, http, HttpResponse } from 'msw';
import { lists, newId, users } from './db';

const tokenFor = (email: string) => `mock-token-${email}`;
const emailFromToken = (token: string | undefined) => token?.startsWith('mock-token-') ? token.slice('mock-token-'.length) : null;

const getCurrentEmail = (request: Request): string | null => {
    const auth = request.headers.get('Authorization');
    const token = auth?.replace(/^Bearer\s+/i, '');
    return emailFromToken(token);
};

export const handlers = [
    http.post('*/auth/register', async ({ request }) => {
        await delay(300);

        const body = (await request.json()) as RegisterData;

        if (users.some((u) => u.email === body.email)) {
            return new HttpResponse(null, { status: 409 })
        }

        users.push({ email: body.email, password: body.password});

        const response: RegisterResponse = { token: tokenFor(body.email)};

        return HttpResponse.json(response, { status: 201 });
    }),

    http.post('*/auth/login', async ({ request }) => {
        await delay(300);
        const body = (await request.json()) as LoginData;

        const user = users.find((u) => u.email === body.email && u.password === body.password);

        if (!user) {
            return HttpResponse.json(null,  {status: 401 })
        }

        const response: LoginResponse = { token: tokenFor(user.email)};

        return HttpResponse.json(response)
    }),

    http.get('*/users/profile', async ({ request }) => {
        await delay(300);

        const email = getCurrentEmail(request);
        if (!email) return new HttpResponse(null, { status: 401 });

        const user = users.find((u) => u.email === email);
        if (!user) return new HttpResponse(null, { status: 404 });

        const response: User = { email: user.email };
        return HttpResponse.json(response);
    }),

    http.get('*/lists', async ({ request }) => {
        await delay(300);

        const email = getCurrentEmail(request);
        if (!email) return new HttpResponse(null, { status: 401 });

        const summaries: ListSummary[] = lists
            .filter((l) => l.owner === email)
            .map(({ owner, items, ...rest }) => rest);

        return HttpResponse.json(summaries);
    }),

    http.get('*/lists/:id', async ({ request, params }) => {
        await delay(300);

        const email = getCurrentEmail(request);
        if (!email) return new HttpResponse(null, { status: 401 });

        const list = lists.find((l) => l.id === params.id && l.owner === email);
        if (!list) return new HttpResponse(null, { status: 404 });

        const { owner, ...rest } = list;
        const response: List = rest;
        return HttpResponse.json(response);
    }),

    http.post('*/lists', async ({ request }) => {
        await delay(300);

        const email = getCurrentEmail(request);
        if (!email) return new HttpResponse(null, { status: 401 });

        const body = (await request.json()) as {
            title: string;
            category: string;
            icon: string;
        };

        const list: List & { owner: string } = {
            id: newId(),
            title: body.title,
            category: body.category,
            icon: body.icon,
            items: [],
            owner: email,
        };

        lists.push(list);

        const { owner, ...rest } = list;
        const response: List = rest;
        return HttpResponse.json(response, { status: 201 });
    }),

    http.patch('*/lists/:id', async ({ request, params }) => {
        await delay(300);

        const email = getCurrentEmail(request);
        if (!email) return new HttpResponse(null, { status: 401 });

        const list = lists.find((l) => l.id === params.id && l.owner === email);
        if (!list) return new HttpResponse(null, { status: 404 });

        const patch = (await request.json()) as Partial<{
            title: string;
            category: string;
            icon: string;
        }>;

        if (patch.title !== undefined) list.title = patch.title;
        if (patch.category !== undefined) list.category = patch.category;
        if (patch.icon !== undefined) list.icon = patch.icon;

        const { owner, ...rest } = list;
        const response: List = rest;
        return HttpResponse.json(response);
    }),

    http.delete('*/lists/:id', async ({ request, params }) => {
        await delay(300);

        const email = getCurrentEmail(request);
        if (!email) return new HttpResponse(null, { status: 401 });

        const idx = lists.findIndex((l) => l.id === params.id && l.owner === email);
        if (idx === -1) return new HttpResponse(null, { status: 404 });

        lists.splice(idx, 1);
        return new HttpResponse(null, { status: 204 });
    }),

    http.post('*/lists/:id/items', async ({ request, params }) => {
        await delay(150);

        const email = getCurrentEmail(request);
        if (!email) return new HttpResponse(null, { status: 401 });

        const list = lists.find((l) => l.id === params.id && l.owner === email);
        if (!list) return new HttpResponse(null, { status: 404 });

        const body = (await request.json()) as {
            type: 'bullet' | 'check' | 'numbered' | 'none';
            text: string;
        };

        const item: ListItem = {
            id: newId(),
            type: body.type,
            text: body.text,
            isDone: body.type === 'check' ? false : null,
        };

        list.items.push(item);
        return HttpResponse.json(item, { status: 201 });
        }),

    http.patch('*/items/:id', async ({ request, params }) => {
        await delay(150);

        const email = getCurrentEmail(request);
        if (!email) return new HttpResponse(null, { status: 401 });

        const list = lists.find(
            (l) => l.owner === email && l.items.some((i) => i.id === params.id)
        );
        if (!list) return new HttpResponse(null, { status: 404 });

        const item = list.items.find((i) => i.id === params.id)!;

        const patch = (await request.json()) as Partial<{
            text: string;
            isDone: boolean | null;
        }>;

        if (patch.text !== undefined) item.text = patch.text;
        if (patch.isDone !== undefined) item.isDone = patch.isDone;

        const response: ListItem = item;
        return HttpResponse.json(response);
    }),
    http.delete('*/items/:id', async ({ request, params }) => {
        await delay(150);

        const email = getCurrentEmail(request);
        if (!email) return new HttpResponse(null, { status: 401 });

        const list = lists.find(
            (l) => l.owner === email && l.items.some((i) => i.id === params.id)
        );
        if (!list) return new HttpResponse(null, { status: 404 });

        const idx = list.items.findIndex((i) => i.id === params.id);
        list.items.splice(idx, 1);
        return new HttpResponse(null, { status: 204 });
        }),
]