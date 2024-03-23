import { getAuth } from "@/libs/nextauth-options";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { list_id: string };
  }
) {
  const session = await getAuth();

  if (!session) return NextResponse.error();
}
