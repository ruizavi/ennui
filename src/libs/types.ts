import { z } from "zod";
import { BoardSchema, ListSchema, LoginUserSchema, NewUserSchema } from "./zod";
import { Card, List } from "@prisma/client";

export type NewUser = z.infer<typeof NewUserSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;
export type Board = z.infer<typeof BoardSchema>;
export type ZList = z.infer<typeof ListSchema>;

export type UIList = Omit<List, "metadata"> &
  Card[] & { metadata: { color?: string } };
