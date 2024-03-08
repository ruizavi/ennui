"use client";

import { usePathname, useRouter } from "next/navigation";

interface Props {
  name: string;
  id: string;
}

export function BoardListElement({ id, name }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (id: string) => router.push(`${pathname}?id=${id}`);

  return (
    <li className="p-2 my-2 hover:underline" onClick={() => handleClick(id)}>
      {name}
    </li>
  );
}
