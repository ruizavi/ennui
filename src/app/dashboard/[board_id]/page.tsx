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
          <div className="flex gap-4 z-20 relative overflow-auto h-full scroll-smooth">
            <Lists boardId={params.board_id} />
            <button className="group min-w-[256px] w-[256px] p-2 bg-none outline-none border-dashed h-[56px] border-2 border-white hover:border-white/60">
              <AddIcon
                className=" group-hover:fill-white/60 fill-white mx-auto"
                width={30}
                height={30}
              />
            </button>
          </div>
        </div>
      </Show.When>
      <Show.Else>No hay datos = (</Show.Else>
    </Show>
  );
}
