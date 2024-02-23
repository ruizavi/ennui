import { NewUser } from "@/libs/types";
import { NewUserSchema } from "@/libs/zod";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { hash } from "argon2";

export async function GET(req: NextRequest) {
  const data: NewUser = await req.json();

  const { success } = NewUserSchema.safeParse(data);

  if (!success) return NextResponse.error();

  const hashedPassword = await hash(data.password);

  const registeredUser = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashedPassword,
    },
    select: {
      email: true,
      name: true,
      image: true,
    },
  });

  return NextResponse.json(registeredUser);
}
