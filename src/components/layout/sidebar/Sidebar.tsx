import React from "react";
import { SidebarContainer } from "./SidebarContainer";
import { SidebarHeader } from "./SidebarHeader";
import { createBoard } from "@/libs/mutation";
import { SidebarFooter } from "./SidebarFooter";
import { AddBoardButton } from "@/components/interactive/button/AddBoardButton";

export default async function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarContainer>
      <SidebarHeader />
      <AddBoardButton action={createBoard} />
      <main>{children}</main>
      <SidebarFooter />
    </SidebarContainer>
  );
}
