import { BoardElement } from "./BoardElement";
import { Each } from "../utils/Each";
import { getBoardsByUser } from "@/libs/query";
import { Board } from "@prisma/client";
import { Suspense } from "react";
import { BoardFallback } from "../fallbacks/BoardFallback";

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
