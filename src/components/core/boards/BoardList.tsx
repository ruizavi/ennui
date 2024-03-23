import { Each } from "@/components/utils/Each";
import { BoardFallback } from "@/components/utils/fallbacks/BoardFallback";
import { BoardElement } from "./BoardElement";
import { getBoardsByUser } from "@/libs/query";
import { Board } from "@prisma/client";
import { Suspense } from "react";

export async function BoardList() {
  const data = await getBoardsByUser();

  return (
    <Suspense fallback={<BoardFallback />}>
      <ul>
        <Each
          of={data as Board[]}
          render={(item) => (
            <BoardElement name={item.name} id={item.id} key={item.id} />
          )}
        />
      </ul>
    </Suspense>
  );
}
