import { AddList } from "@/components/button/AddListButton";
import { AddIcon } from "@/components/icons/AddIcon";
import { Lists } from "@/components/lists/Lists";
import { Show } from "@/components/utils/Show";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { board_id: string };
}) {
  async function fetchingBoard(id: string) {
    try {
      const res = await fetch(`http://localhost:3000/api/board/${id}`, {
        method: "get",
        headers: {
          Cookie: cookies().toString(),
        },
      });

      if (!res.ok) throw new Error();

      const data = (await res.json()) as unknown as {
        id: string;
        name: string;
        metadata: { background: string };
        userId: string;
      };

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const data = await fetchingBoard(params.board_id);

  return (
    <Show>
      <Show.When isTrue={typeof data === "object"}>
        <div className="w-full h-full rounded-lg overflow-hidden relative p-4">
          <Show>
            <Show.When isTrue={data?.metadata.background !== undefined}>
              <Image
                src={data?.metadata.background as string}
                alt="board background"
                fill
                className="size-full object-cover opacity-50"
              />
            </Show.When>
          </Show>
          <div className="z-10 relative h-full overflow-auto scroll-smooth">
            <div className="flex gap-4 ">
              <Lists boardId={params.board_id} />
              <AddList boardId={params.board_id} />
            </div>
          </div>
        </div>
      </Show.When>
      <Show.Else>No hay datos = (</Show.Else>
    </Show>
  );
}
