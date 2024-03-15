"use client";

import { usePathname, useRouter } from "next/navigation";
import { OrbIcon } from "../icons/OrbIcon";
import { Tooltip } from "../utils/Tooltip";
import { useExpand } from "@/hooks/useExpand";
import { SIDEBAR_EXPAND } from "@/libs/const";

interface Props {
  name: string;
  id: string;
}

export function BoardListElement({ id, name }: Props) {
  const router = useRouter();

  const { location } = useExpand();

  const handleClick = (id: string) => router.push(`/dashboard/${id}`);

  return (
    <li className="flex gap-4 items-center" onClick={() => handleClick(id)}>
      {location[SIDEBAR_EXPAND] ? (
        <OrbIcon width={30} height={30} className="min-w-[30px]" />
      ) : (
        <Tooltip message={name}>
          <OrbIcon width={30} height={30} className="min-w-[30px]" />
        </Tooltip>
      )}

      <p className="text-ellipsis overflow-hidden">{name}</p>
    </li>
  );
}
