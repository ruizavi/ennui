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
      <div className="flex w-screen h-screen">
        <DashboardNavbar>
          <BoardList />
        </DashboardNavbar>
        <main className="w-full h-full">{children}</main>
      </div>
      <ModalContainer />
    </IsAuthenticate>
  );
}
