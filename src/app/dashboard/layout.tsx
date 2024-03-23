import { BoardList } from "@/components/core/boards/BoardList";
import { ToggleButton } from "@/components/interactive/button/ToggleButton";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import IsAuthenticate from "@/components/utils/IsAuthenticate";
import { ModalContainer } from "@/components/utils/modal/ModalContainer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <IsAuthenticate>
      <Sidebar>
        <BoardList />
      </Sidebar>
      <main className="w-full h-full bg-white rounded-xl overflow-hidden relative">
        <ToggleButton />
        {children}
        <ModalContainer />
      </main>
    </IsAuthenticate>
  );
}
