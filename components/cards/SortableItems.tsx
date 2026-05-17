import { SwipeableItemRow } from "@/components/cards/SwipeableItemRow";
import { useReorderItem } from "@/hooks/useItems";
import { ListItem } from "@/schemas/list";
import { View } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";

export function SortableItems({ items, listId, editMode }: { items: ListItem[]; listId: number; editMode: boolean }) {
    const { mutate: reorderItem } = useReorderItem(listId);

    return (
        <DraggableFlatList
            data={items}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, drag, getIndex }) => (
                <ScaleDecorator activeScale={1.05}>
                    <View style={{ marginBottom: 8 }}>
                        <SwipeableItemRow
                            item={item}
                            index={getIndex() ?? 0}
                            listId={listId}
                            onLongPress={drag}
                            editMode={editMode}
                        />
                    </View>
                </ScaleDecorator>
            )}
            onDragEnd={({ data, from, to }) => {
                if (from === to) return;
                const moved = data[to];
                const prev = to > 0 ? data[to - 1] : null;
                const next = to < data.length - 1 ? data[to + 1] : null;
                reorderItem({
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
