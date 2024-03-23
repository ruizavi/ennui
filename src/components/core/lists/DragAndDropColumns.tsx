"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { Column } from "./Column";
import { Each } from "@/components/utils/Each";

export function DragAndDropColumns({
  cols,
  boardId,
}: {
  cols: any[];
  boardId: string;
}) {
  const [columns, setColumns] = useState(cols || []);

  const dragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    const oldIndex = columns.findIndex((l) => l.id === active.id);
    const newIndex = columns.findIndex((l) => l.id === over!.id);

    const prevColumns = columns;

    const nextColumns = arrayMove(columns, oldIndex, newIndex);

    setColumns(nextColumns);

    const update = nextColumns.map((a, i) => ({
      id: a.id,
      position: i,
    }));

    try {
      const res = await fetch(
        `http://localhost:3000/api/board/${boardId}/list`,
        { body: JSON.stringify(update), method: "PATCH" }
      );

      if (!res.ok) setColumns(prevColumns);
    } catch (error) {
      setColumns(prevColumns);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={dragEnd}>
      <ul className="flex gap-4">
        <SortableContext
          items={columns}
          strategy={horizontalListSortingStrategy}
        >
          <Each of={columns} render={(l) => <Column {...l} key={l.id} />} />
        </SortableContext>
      </ul>
    </DndContext>
  );
}
