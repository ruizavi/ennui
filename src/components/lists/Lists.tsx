import { cookies } from "next/headers";
import { ListOfLists } from "./ListOfLists";
import { Show } from "../utils/Show";
import { UIList } from "@/libs/types";

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

      const data = await res.json();

      return data as unknown as UIList[];
    } catch (error) {}
  }

  const data = await getLists(boardId);

  return (
    <Show>
      <Show.When isTrue={data !== undefined}>
        <ListOfLists lists={data as UIList[]} boardId={boardId} />
      </Show.When>
    </Show>
  );
}
