import z from "zod";


export const UserSchema = z.object({
  name: z.string().max(255, "Naam te lang").nonempty("Je moet een naam invullen")
})


export type User = z.infer<typeof UserSchema>