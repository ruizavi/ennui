import { AddList } from "@/components/button/AddListButton";
import { AddIcon } from "@/components/utils/icons/AddIcon";
import { Lists } from "@/components/lists/Lists";
import { Show } from "@/components/utils/Show";
import { cookies } from "next/headers";
import Image from "next/image";
import { Suspense } from "react";

async function getData(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/board/${id}`, {
      method: "get",
      headers: {
        Cookie: cookies().toString(),
      },
    });

    if (!res.ok) throw new Error();

    const data = await res.json();

    return data as unknown as {
      id: string;
      name: string;
      metadata: { background: string };
      userId: string;
    };
  } catch (error) {
    console.log(error);
  }
}

export default async function Page({
  params,
}: {
  params: { board_id: string };
}) {
  const data = await getData(params.board_id);

  return (
    <Suspense fallback={"Cargando datos..."}>
      <Show>
        <Show.When isTrue={typeof data === "object"}></Show.When>
        <Show.Else>No hay datos = (</Show.Else>
      </Show>
    </Suspense>
  );
}
