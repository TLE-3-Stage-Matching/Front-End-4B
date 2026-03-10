import z from "zod";

export const RegisterSchema = z.object({
  first_name: z
    .string()
    .max(100, "Naam te lang")
    .nonempty("Je moet een naam invullen"),
  middle_name: z.string().max(100, "Tussenvoegsel te lang"),
  last_name: z
    .string()
    .max(100, "Naam te lang")
    .nonempty("Je moet een naam invullen"),
  email: z.email("Je moet een geldig emailadres invullen"),
  password: z.string().min(8, "Wachtwoord moet minimaal 8 tekens bevatten"),
  confirm_password: z.string().nonempty("Je moet het wachtwoord bevestigen"),
});

export const LoginSchema = z.object({
  email: z.email("Je moet een geldig emailadres invullen"),
  password: z.string().min(8, "Wachtwoord moet minimaal 8 tekens bevatten"),
});

export const RegisterCompanySchema = z.object({
  name: z
    .string()
    .max(255, "Naam te lang")
    .nonempty("Bedrijfsnaam is verplicht"),
});

export const RegisterCompanyUserSchema = RegisterSchema.extend({
  company_id: z.string().nonempty("Selecteer een bedrijf"),
});

export const AuthUserSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  middle_name: z.string().nullable(),
  last_name: z.string(),
  email: z.string(),
  role: z.enum(["coordinator", "company_user", "student"]),
  phone: z.string().nullable(),
  profile_photo_url: z.string().nullable(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;
