"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import React from "react";
import { AddBoardButton } from "../boards/AddBoardButton";
import { Modal } from "../Modal";

export function DashboardNavbar({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  return (
    <>
      <nav className="z-20 flex shrink-0 grow-0 justify-around  border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-2/4 -translate-y-2/4 left-2 min-h-[auto] min-w-[64px] max-w-[128px] overflow-ellipsis transition-all flex-col rounded-lg ">
        <header className="p-2 ">
          <Image
            src={data?.user.image}
            alt={data?.user.name}
            width={64}
            height={64}
            className="mx-auto rounded-full"
          />
          <h1 className="font-bold text-center">{data?.user.name}</h1>
        </header>
        <main>{children}</main>
        <footer className="flex justify-around">
          <AddBoardButton />
        </footer>
      </nav>
      <Modal listen="hola">hola</Modal>
    </>
  );
}
