"use client";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  return (
    <>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
      <code>{JSON.stringify(session)}</code>
    </>
  );
}
