"use client";

import { useExpand } from "@/hooks/useExpand";
import { SIDEBAR_EXPAND } from "@/libs/const";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import DefaultProfile from "@/assets/default-profile.png";
import { LogoutIcon } from "../icons/LogoutIcon";
import { AddIcon } from "../icons/AddIcon";

export function DashboardNavbar({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  const { location } = useExpand();

  return (
    <nav
      className={`bg-white rounded-xl truncate transition-[width] ${
        location[SIDEBAR_EXPAND] ? "w-[270px]" : "w-[56px]"
      } transition-all duration-500 p-3 flex flex-col z-10`}
    >
      <header className="flex gap-4 items-center">
        <Image
          src={data?.user.image || DefaultProfile}
          alt={data?.user.name}
          width={30}
          height={30}
        />
        <p className="font-semibold">{data?.user.name}</p>
      </header>
      <button className="py-4 w-full hover:[&>svg]:fill-[#CD4A7B] ">
        <AddIcon className="fill-[#C11D5A] mx-auto" width={24} height={24} />
      </button>
      <main>{children}</main>
      <footer className="justify-self-end mt-auto">
        <button onClick={() => signOut()} className="flex gap-4 items-center">
          <LogoutIcon className="fill-[#C11D5A]" width={30} height={30} />
          <p className="font-semibold">Log Out</p>
        </button>
      </footer>
    </nav>
  );
}
