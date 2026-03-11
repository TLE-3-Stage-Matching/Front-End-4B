import z from "zod";

export const CompanyProfileSchema = z.object({
  name: z
    .string()
    .max(255, "Naam te lang")
    .nonempty("Je moet een naam invullen"),
  email: z
    .email("Je moet een geldig emailadres invullen")
    .max(255, "E-mail te lang"),
  phone: z
    .string()
    .min(6, "Vul een geldig telefoonnummer in")
    .max(50, "Telefoonnummer te lang"),
  size_category: z.enum(["1-10", "11-50", "51-200", "200+"]),
  description: z.string(),
  industry_tag_id: z.number().nullable(),
  photo_url: z.string(),
  banner_url: z.string(),
});

export type CompanyProfile = z.infer<typeof CompanyProfileSchema>;