"use client";

import { useSession } from "next-auth/react";
import Navigate from "./Navigate";

function IsAuthenticate({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

export default IsAuthenticate;
