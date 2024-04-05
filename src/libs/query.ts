import { getAuth } from "@/libs/nextauth-options";

export async function getBoardsByUser() {
  const session = await getAuth();

  if (!session) throw new Error();

  const boards = await prisma?.board.findMany({
    where: { userId: session.user.id },
  });

  return boards;
}

export async function getBoardById(id?: string) {
  const session = await getAuth();

  if (!session) throw new Error();

  if (!id) throw new Error();

  const board = await prisma?.board.findUnique({
    where: { id },
  });

  if (!board) throw new Error();

  let metadata: Record<string, string> = {};

  if (board.metadata) {
    metadata = { ...JSON.parse(board.metadata) };
  }

  return { ...board, metadata };
}

export async function getColumnsOfBoard(id?: string) {
  const session = await getAuth();

  if (!session) throw new Error();

  if (!id) throw new Error();

  const columns = await prisma?.list.findMany({
    where: { boardId: id },
    orderBy: { position: "asc" },
    include: { card: true },
  });

  if (!columns) throw new Error();

  return columns;
}
