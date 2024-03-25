import React from "react";
import { SidebarContainer } from "./SidebarContainer";
import { SidebarHeader } from "./SidebarHeader";
import { createBoard } from "@/libs/mutation";
import { SidebarFooter } from "./SidebarFooter";
import { CreateBoardButton } from "@/components/interactive/button/CreateBoardButton";

export default async function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarContainer>
      <SidebarHeader />
      <CreateBoardButton action={createBoard} />
      <main>{children}</main>
      <SidebarFooter />
    </SidebarContainer>
  );
}
