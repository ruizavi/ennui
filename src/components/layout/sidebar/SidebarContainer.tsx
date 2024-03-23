"use client";

import { useExpand } from "@/hooks/useExpand";
import { SIDEBAR_EXPAND } from "@/libs/const";
import React from "react";

export function SidebarContainer({ children }: { children: React.ReactNode }) {
  const { location } = useExpand();

  return (
    <nav
      className={`bg-white rounded-xl truncate transition-[width] ${
        location[SIDEBAR_EXPAND] ? "w-[270px]" : "w-[56px]"
      } transition-all duration-500 p-3 flex flex-col `}
    >
      {children}
    </nav>
  );
}
