"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import DefaultProfile from "@/assets/default-profile.png";
import { useRouter } from "next/navigation";

export function SidebarHeader() {
  const { data } = useSession();

  const { push } = useRouter();

  return (
    <header className="flex gap-4 items-center">
      <Image
        src={data?.user.image || DefaultProfile}
        alt={data?.user.name}
        width={30}
        height={30}
        onClick={() => push("/dashboard")}
      />
      <p className="font-semibold">{data?.user.name}</p>
    </header>
  );
}
