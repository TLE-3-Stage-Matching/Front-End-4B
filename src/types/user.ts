import z from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .max(255, "Naam te lang")
    .nonempty("Je moet een naam invullen"),
});

export const RegisterStudentSchema = z.object({
  email: z.string().email("Je moet een geldig emailadres invullen"),
});

export const RegisterCompanySchema = RegisterStudentSchema.extend({
  name: z
    .string()
    .max(255, "Naam te lang")
    .nonempty("Je moet een naam invullen"),
});

export const CompanyProfileSchema = z.object({
  name: z
    .string()
    .max(255, "Naam te lang")
    .nonempty("Je moet een naam invullen"),
  email: z.string().email("Je moet een geldig emailadres invullen"),
  address: z.string().min(5, "Vul een geldig adres in"),
  industry: z.string().min(2, "Vul een geldige branche in"),
  phone: z.string().min(6, "Vul een geldig telefoonnummer in"),
  size: z.enum(["1-10", "11-50", "51-200", "200+"]),
  extra: z.string().optional(),
  logo: z.any().optional(),
  banner: z.any().optional(),
});

export type User = z.infer<typeof UserSchema>;
export type CompanyProfile = z.infer<typeof CompanyProfileSchema>;
