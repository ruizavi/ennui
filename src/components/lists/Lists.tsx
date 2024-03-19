import { List } from "@prisma/client";
import { cookies } from "next/headers";
import { ListOfLists } from "./ListOfLists";
import { Show } from "../utils/Show";

export async function Lists({ boardId }: { boardId: string }) {
  async function getLists(id: string) {
    try {
      const res = await fetch(`http://localhost:3000/api/board/${id}/list`, {
        method: "get",
        headers: {
          Cookie: cookies().toString(),
        },
      });

      if (!res.ok) throw new Error();

      const data = (await res.json()) as unknown as List[];

      return data;
    } catch (error) {}
  }

  const data = await getLists(boardId);

  return (
    <Show>
      <Show.When isTrue={data !== undefined}>
        <ListOfLists lists={data as List[]} boardId={boardId} />
      </Show.When>
    </Show>
  );
}
