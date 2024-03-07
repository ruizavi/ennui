import IsAuthenticate from "@/components/IsAuthenticate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ennui Dashboard",
  description: "User Dashboard",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <IsAuthenticate>{children}</IsAuthenticate>;
}
