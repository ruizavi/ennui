"use client";
import { useExpand } from "@/hooks/useExpand";
import { SIDEBAR_EXPAND } from "@/libs/const";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const { toggle } = useExpand();

  return (
    <>
      <button onClick={() => toggle(SIDEBAR_EXPAND)}>que tal?</button>
      <code>{JSON.stringify(searchParams.getAll("id"))}</code>
    </>
  );
}
