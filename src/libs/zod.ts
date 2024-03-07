import { z } from "zod";

export const NewUserSchema = z
  .object({
    name: z.string({ required_error: "The username is required" }),
    email: z.string({ required_error: "The email is required" }).email(),
    password: z
      .string({ required_error: "The password is required" })
      .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&]).{8,32}$/),
    confirmPassword: z.string({
      required_error: "Confirm password is required`",
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

export const LoginUserSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&]).{8,32}$/),
});

export const BoardSchema = z.object({
  name: z.string({ required_error: "Board's name is required" }),
  background: z.string().url().optional(),
});
