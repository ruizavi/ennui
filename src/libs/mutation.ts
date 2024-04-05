"use server";

import { getAuth } from "@/libs/nextauth-options";

import { BoardSchema } from "@/libs/zod";
import { toData } from "@/libs/utils";

export async function createBoard(data: FormData) {
  const session = await getAuth();

  if (!session) throw new Error();

  const values = toData(data);

  const { name, background } = BoardSchema.parse(values);

  const metadata = JSON.stringify({ background });

  return await prisma?.board.create({
    data: {
      name,
      metadata,
      userId: session.user.id,
    },
  });
}
