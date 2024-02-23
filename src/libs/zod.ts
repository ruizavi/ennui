import { z } from "zod";

export const NewUserSchema = z
  .object({
    name: z.string({ required_error: "El nombre es requerido" }),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&]).{8,32}$/,
        "La contraseña no es segura"
      ),
    confirmPassword: z
      .string()
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&]).{8,32}$/,
        "La contraseña no es segura"
      ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Las contraseñas no coinciden",
      });
    }
  });
