import { Board } from "@prisma/client";
import { cookies } from "next/headers";
import { BoardListElement } from "./BoardListElement";
import { Each } from "../Each";

async function getBoardListByUser() {
  const res = await fetch("http://localhost:3000/api/board", {
    method: "get",
    headers: {
      Cookie: cookies().toString(),
    },
  });

  if (!res.ok) return [];

  const data: Board[] = await res.json();

  return data;
}

export async function BoardList() {
  const data = await getBoardListByUser();

  return (
    <ul>
      <Each
        of={data}
        render={(item) => (
          <BoardListElement name={item.name} id={item.id} key={item.id} />
        )}
      />
    </ul>
  );
}
