"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useExpand } from "@/hooks/useExpand";
import { SIDEBAR_EXPAND } from "@/libs/const";
import { Show } from "@/components/utils/Show";
import { Tooltip } from "@/components/utils/Tooltip";
import { OrbIcon } from "@/components/utils/icons/OrbIcon";

interface Props {
  name: string;
  id: string;
}

export function BoardElement({ id, name }: Props) {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { location } = useExpand();

  const handleClick = (id: string) => {
    const params = new URLSearchParams(searchParams);

    if (id) params.set("board", id);
    else params.delete("board");

    push(`${pathname}?${params.toString()}`);
  };

  return (
    <li className="flex gap-4 items-center" onClick={() => handleClick(id)}>
      <Show>
        <Show.When isTrue={location[SIDEBAR_EXPAND]}>
          <OrbIcon width={30} height={30} className="min-w-[30px]" />
        </Show.When>
        <Show.Else>
          <Tooltip message={name}>
            <OrbIcon width={30} height={30} className="min-w-[30px]" />
          </Tooltip>
        </Show.Else>
      </Show>
      <p className="text-ellipsis overflow-hidden">{name}</p>
    </li>
  );
}
