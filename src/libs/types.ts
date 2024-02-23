import { z } from "zod";
import { NewUserSchema } from "./zod";

export type NewUser = z.infer<typeof NewUserSchema>;
