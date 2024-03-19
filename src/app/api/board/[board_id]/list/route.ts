import { getAuth } from "@/libs/nextauth-options";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { board_id: string } }
) {
  const session = await getAuth();

  if (!session) return NextResponse.error();

  const data: { name: string } = await req.json();

  const predecessor = await prisma?.list.findFirst({
    where: {
      boardId: params.board_id,
    },
    orderBy: {
      position: "desc",
    },
    take: 1,
  });

  const firstListOfBoard = await prisma?.list.create({
    data: {
      name: data.name,
      boardId: params.board_id,
      position: predecessor ? predecessor.position + 1 : 0,
    },
  });

  return NextResponse.json(firstListOfBoard);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { board_id: string } }
) {
  const session = await getAuth();

  if (!session) return NextResponse.error();

  const boards = await prisma?.list.findMany({
    where: { boardId: params.board_id },
    orderBy: {
      position: "asc",
    },
  });

  return NextResponse.json(boards);
}

export async function PATCH(
  req: NextResponse,
  { params }: { params: { board_id: string } }
) {
  const session = await getAuth();

  if (!session) return NextResponse.error();

  const data: {
    position: number;
    id: string;
  }[] = await req.json();

  const queries = data.map((l) =>
    prisma.list.update({
      where: { id: l.id },
      data: { position: l.position },
    })
  );

  const updatedPosition = await prisma?.$transaction(queries);

  return NextResponse.json(updatedPosition);
}
