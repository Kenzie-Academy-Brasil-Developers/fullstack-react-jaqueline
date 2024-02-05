import { z } from "zod";

export const editClientSchema = z.object({
  name: z.string(),
  email: z.string(),
  telephone: z.string(),

});
