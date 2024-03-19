"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { List } from "@prisma/client";
import { useState } from "react";
import { ListElement } from "./ListElement";

export function ListOfLists({
  lists,
  boardId,
}: {
  lists: List[];
  boardId: string;
}) {
  const [list, setLists] = useState(
    lists.sort((a, b) => a.position - b.position) || []
  );

  const dragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    const oldIndex = list.findIndex((l) => l.id === active.id);
    const newIndex = list.findIndex((l) => l.id === over!.id);

    const prevList = list;

    const nextList = arrayMove(list, oldIndex, newIndex);

    setLists(nextList);

    const update = nextList.map((a, i) => ({
      id: a.id,
      position: i,
    }));

    try {
      const res = await fetch(
        `http://localhost:3000/api/board/${boardId}/list`,
        { body: JSON.stringify(update), method: "PATCH" }
      );
      console.log(res);

      if (!res.ok) setLists(prevList);
    } catch (error) {
      console.log(error);
      setLists(prevList);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={dragEnd}>
      <ul className="flex gap-4">
        <SortableContext items={list} strategy={horizontalListSortingStrategy}>
          {list.map((a) => (
            <ListElement {...a} key={a.id} />
          ))}
        </SortableContext>
      </ul>
    </DndContext>
  );
}
