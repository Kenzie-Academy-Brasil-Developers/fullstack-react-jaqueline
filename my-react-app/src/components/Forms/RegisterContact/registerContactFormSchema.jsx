import { z } from "zod";

export const registerContactSchema = z.object({
  name: z.string().nonempty({ message: "Campo obrigatório" }),
  email: z
    .string()
    .nonempty({ message: "Campo obrigatório" })
    .email("Forneça um e-mail válido"),
  telephone: z.string().nonempty({ message: "Campo obrigatório" }),
  clientId: z.number(),
});
