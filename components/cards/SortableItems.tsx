import { SwipeableSectionRow } from "@/components/cards/SwipeableSectionRow";
import { SwipeableItemRow } from "@/components/cards/SwipeableItemRow";
import { useReorderListSection } from "@/hooks/useListSections";
import { useReorderItem } from "@/hooks/useItems";
import { ListItem, ListSection } from "@/schemas/list";
import { useMemo } from "react";
import { View } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";

type Row =
    | { kind: 'section'; section: ListSection }
    | { kind: 'item'; item: ListItem; itemIndex: number };

export function SortableItems({ items, sections, listId, editMode }: { items: ListItem[]; sections: ListSection[]; listId: number; editMode: boolean }) {
    const { mutate: reorderItem } = useReorderItem(listId);
    const { mutate: reorderSection } = useReorderListSection(listId);
    const rows = useMemo(() => buildRows(items, sections), [items, sections]);

    return (
        <DraggableFlatList
            data={rows}
            keyExtractor={(row) => row.kind === 'section' ? `section-${row.section.id}` : `item-${row.item.id}`}
            renderItem={({ item: row, drag }) => (
                <ScaleDecorator activeScale={1.05}>
                    <View style={{ marginBottom: 8 }}>
                        {row.kind === 'section' ? (
                            <SwipeableSectionRow
                                section={row.section}
                                listId={listId}
                                onLongPress={drag}
                                editMode={editMode}
                            />
                        ) : (
                            <SwipeableItemRow
                                item={row.item}
                                index={row.itemIndex}
                                listId={listId}
                                onLongPress={drag}
                                editMode={editMode}
                            />
                        )}
                    </View>
                </ScaleDecorator>
            )}
            onDragEnd={({ data, from, to }) => {
                if (from === to) return;
                const moved = data[to];
                if (moved.kind === 'section') {
                    const sectionRows = data.filter((row): row is Extract<Row, { kind: 'section' }> => row.kind === 'section');
                    const index = sectionRows.findIndex((row) => row.section.id === moved.section.id);
                    const previous = index > 0 ? sectionRows[index - 1].section : null;
                    const next = index < sectionRows.length - 1 ? sectionRows[index + 1].section : null;
                    reorderSection({
                        id: moved.section.id,
                        input: { previousId: previous?.id ?? null, nextId: next?.id ?? null },
                    });
                } else {
                    const sectionId = sectionIdAt(data, to);
                    const previous = previousItemInSection(data, to, sectionId, moved.item.id);
                    const next = nextItemInSection(data, to, sectionId, moved.item.id);
                    reorderItem({
                        id: moved.item.id,
                        input: { previousId: previous?.id ?? null, nextId: next?.id ?? null, sectionId },
                    });
                }
            }}
            activationDistance={10}
            containerStyle={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
        />
    );
}

function buildRows(items: ListItem[], sections: ListSection[]): Row[] {
    const rows: Row[] = [];
    let itemIndex = 0;
    const unsectioned = items.filter((item) => item.sectionId === null);
    for (const item of unsectioned) rows.push({ kind: 'item', item, itemIndex: itemIndex++ });
    for (const section of sections) {
        rows.push({ kind: 'section', section });
        const sectionItems = items.filter((item) => item.sectionId === section.id);
        for (const item of sectionItems) rows.push({ kind: 'item', item, itemIndex: itemIndex++ });
    }
    return rows;
}

function sectionIdAt(rows: Row[], index: number): number | null {
    for (let i = index - 1; i >= 0; i--) {
        const row = rows[i];
        if (row.kind === 'section') return row.section.id;
    }
    return null;
}

function previousItemInSection(rows: Row[], index: number, sectionId: number | null, movedId: number) {
    for (let i = index - 1; i >= 0; i--) {
        const row = rows[i];
        if (row.kind === 'item' && row.item.id !== movedId && row.item.sectionId === sectionId) return row.item;
    }
    return null;
}

function nextItemInSection(rows: Row[], index: number, sectionId: number | null, movedId: number) {
    for (let i = index + 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.kind === 'item' && row.item.id !== movedId && row.item.sectionId === sectionId) return row.item;
    }
    return null;
}
