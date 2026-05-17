import { SwipeableListRow } from "@/components/cards/SwipeableListRow";
import { useReorderList } from "@/hooks/useLists";
import { ListSummary } from "@/schemas/list";
import { router } from "expo-router";
import { View } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";

export function SortableLists({ lists }: { lists: ListSummary[] }) {
    const { mutate: reorderList } = useReorderList();

    return (
        <DraggableFlatList
            data={lists}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, drag }) => (
                <ScaleDecorator activeScale={1.05}>
                    <View style={{ marginBottom: 10 }}>
                        <SwipeableListRow
                            list={item}
                            onPress={() => router.push(`/list/${item.id}`)}
                            onLongPress={drag}
                        />
                    </View>
                </ScaleDecorator>
            )}
            onDragEnd={({ data, from, to }) => {
                if (from === to) return;
                const moved = data[to];
                const prev = to > 0 ? data[to - 1] : null;
                const next = to < data.length - 1 ? data[to + 1] : null;
                reorderList({
                    id: moved.id,
                    input: { previousId: prev?.id ?? null, nextId: next?.id ?? null },
                });
            }}
            activationDistance={10}
            containerStyle={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
        />
    );
}
