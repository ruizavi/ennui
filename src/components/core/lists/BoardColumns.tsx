import { DragAndDropColumns } from "./DragAndDropColumns";
import { Suspense } from "react";
import { getColumnsOfBoard } from "@/libs/query";

export async function BoardColumns({ boardId }: { boardId: string }) {
  const data = await getColumnsOfBoard(boardId);

  return (
    <Suspense key={`lists-${boardId}`} fallback={"cargando listas..."}>
      <DragAndDropColumns cols={data} boardId={boardId} />
    </Suspense>
  );
}
