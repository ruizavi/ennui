import IsAuthenticate from "@/components/IsAuthenticate";
import { BoardList } from "@/components/boards/BoardList";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";

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
        <main className="">{children}</main>
      </div>
    </IsAuthenticate>
  );
}
