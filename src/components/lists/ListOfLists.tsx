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
import { Each } from "../utils/Each";
import { UIList } from "@/libs/types";

export function ListOfLists({
  lists,
  boardId,
}: {
  lists: UIList[];
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
          <Each of={list} render={(l) => <ListElement {...l} key={l.id} />} />
        </SortableContext>
      </ul>
    </DndContext>
  );
}
