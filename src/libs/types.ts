import { z } from "zod";
import { LoginUserSchema, NewUserSchema } from "./zod";

export type NewUser = z.infer<typeof NewUserSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;
