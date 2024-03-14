import IsAuthenticate from "@/components/IsAuthenticate";
import { BoardList } from "@/components/boards/BoardList";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { ModalContainer } from "@/components/modal/ModalContainer";

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
        <main className="w-full h-full bg-white rounded-xl">{children}</main>
      </div>
      <ModalContainer />
    </IsAuthenticate>
  );
}