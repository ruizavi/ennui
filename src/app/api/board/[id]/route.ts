import { getAuth } from "@/libs/nextauth-options";
import { Board } from "@/libs/types";
import { BoardSchema } from "@/libs/zod";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuth();

  if (!session) return NextResponse.error();

  const data: Board = await req.json();

  const { success } = BoardSchema.safeParse(data);

  if (!success) return NextResponse.error();

  const metadata = { background: data.background } as Prisma.JsonObject;

  const updatedBoard = await prisma?.board.update({
    where: { id: params.id, userId: session.user.id },
    data: {
      name: data.name,
      metadata,
    },
  });

  return NextResponse.json(updatedBoard);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuth();

  if (!session) return NextResponse.error();

  const deletedBoard = await prisma?.board.delete({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  return NextResponse.json(deletedBoard);
}
