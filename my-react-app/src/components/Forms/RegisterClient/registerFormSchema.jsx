import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().nonempty({ message: "Campo obrigatório" }),
    email: z
      .string()
      .nonempty({ message: "Campo obrigatório" })
      .email("Forneça um e-mail válido"),
      telephone: z
      .string().nonempty({ message: "Campo obrigatório" }),
    password: z
      .string()
      .min(6, "É necessário no mínimo 6 dígitos"),
    confirmPassword: z.string().nonempty("Confirme sua senha"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  })

