import { Show } from "@/components/utils/Show";
import { getBoardById } from "@/libs/query";
import { Suspense } from "react";
import Image from "next/image";
import { BoardColumns } from "@/components/core/lists/BoardColumns";
import { AddList } from "@/components/interactive/button/AddListButton";

export default async function Page({
  searchParams,
}: {
  searchParams?: { board: string };
}) {
  if (!searchParams?.board) return "No hay dashboard cargado";

  const data = await getBoardById(searchParams?.board);

  return (
    <Suspense
      key={`board-${searchParams.board}`}
      fallback={"Esta cargando la informacion del tablero"}
    >
      <div className="w-full h-full rounded-lg overflow-hidden relative p-4">
        <Show>
          <Show.When isTrue={data.metadata.background !== undefined}>
            <Image
              src={data.metadata.background as string}
              alt="board background"
              fill
              className="size-full object-cover opacity-50"
            />
          </Show.When>
        </Show>
        <div className="z-10 relative h-full overflow-auto scroll-smooth">
          <div className="flex gap-4 ">
            <BoardColumns boardId={searchParams?.board as string} />
            <AddList boardId={searchParams?.board as string} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
