import { Board } from "@/libs/types";
import { BoardSchema } from "@/libs/zod";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getAuth } from "@/libs/nextauth-options";

export async function POST({ json }: NextRequest) {
  const session = await getAuth();

  if (!session) return NextResponse.error();

  const data: Board = await json();

  const { success } = BoardSchema.safeParse(data);

  if (!success) return NextResponse.error();

  const metadata = { background: data.background } as Prisma.JsonObject;

  const board = await prisma?.board.create({
    data: {
      name: data.name,
      metadata,
      userId: session.user.id,
    },
  });

  return NextResponse.json(board);
}

export async function GET() {
  const session = await getAuth();

  if (!session) return NextResponse.error();

  const boards = await prisma?.board.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(boards);
}
