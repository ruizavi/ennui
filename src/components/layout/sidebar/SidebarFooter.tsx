"use client";

import { signOut } from "next-auth/react";
import { LogoutIcon } from "@/components/utils/icons/LogoutIcon";

export function SidebarFooter() {
  return (
    <footer className="justify-self-end mt-auto">
      <button onClick={() => signOut()} className="flex gap-4 items-center">
        <LogoutIcon className="fill-[#C11D5A]" width={30} height={30} />
        <p className="font-semibold">Log Out</p>
      </button>
    </footer>
  );
}
