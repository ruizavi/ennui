import { z } from "zod";
import { BoardSchema, LoginUserSchema, NewUserSchema } from "./zod";

export type NewUser = z.infer<typeof NewUserSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;
export type Board = z.infer<typeof BoardSchema>;
