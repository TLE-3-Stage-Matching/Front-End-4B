import z, { email } from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .max(255, "Naam te lang")
    .nonempty("Je moet een naam invullen"),
});

export const RegisterStudentSchema = z.object({
  email: z.email("Je moet een geldig emailadres invullen"),
});

export const RegisterCompanySchema = RegisterStudentSchema.extend({
  name: z
    .string()
    .max(255, "Naam te lang")
    .nonempty("Je moet een naam invullen"),
});

export type User = z.infer<typeof UserSchema>;
