import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().nonempty({message: "Campo obrigatório"}),
    password: z.string().nonempty({message: "Campo obrigatório"})
})