import { BoardList } from "@/components/boards/BoardList";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { ToggleButton } from "@/components/layout/ToggleButton";
import IsAuthenticate from "@/components/utils/IsAuthenticate";
import { ModalContainer } from "@/components/utils/modal/ModalContainer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <IsAuthenticate>
      <div className="flex w-screen h-screen p-4 bg-[#DCD5E0] gap-4">
        <DashboardNavbar>
          <BoardList />
        </DashboardNavbar>
        <main className="w-full h-full bg-white rounded-xl relative z-10">
          <ToggleButton />
          {children}
        </main>
      </div>
      <ModalContainer />
    </IsAuthenticate>
  );
}
