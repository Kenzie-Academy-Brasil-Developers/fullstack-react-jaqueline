import { z } from "zod";

export const editSchema = z.object({
  name: z.string().nonempty({ message: "Campo obrigatório" }),
  email: z.string().nonempty({ message: "Campo obrigatório" }),
  telephone: z.string().nonempty({ message: "Campo obrigatório" }),

});
