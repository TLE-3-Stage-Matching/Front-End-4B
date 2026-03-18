import z from "zod";

export const VacancyTagNewSchema = z.object({
  name: z.string().min(1),
  tag_type: z.enum(["skill", "trait", "education"]),
});

export const VacancyTagExistingSchema = z.object({
  id: z.number(),
});

export const VacancyTagSchema = z.union([
  VacancyTagExistingSchema,
  VacancyTagNewSchema,
]);

export const VacancySchema = z.object({
  id: z.int(),
  title: z.string().min(1, "Vereist").max(255),
  company: z.string(),
  hours_per_week: z
    .union([
      z.literal(8),
      z.literal(16),
      z.literal(24),
      z.literal(32),
      z.literal(36),
      z.literal(40),
    ])
    .optional(),

  description: z.string().optional(),
  offer_text: z.string().optional(),
  expectations_text: z.string().optional(),
  tags: VacancyTagSchema.array().optional(),
  education_tags: VacancyTagSchema.array().optional(),
  matchscore: z.int(),
  favorite: z.boolean(),
});

export type Vacancy = z.infer<typeof VacancySchema>;

// Creation schema: frontend sends separate skill_tags and trait_tags arrays
export const VacancyCreateSchema = z.object({
  title: z.string().min(1, "Vereist").max(255),
  hours_per_week: z
    .union([
      z.literal(8),
      z.literal(16),
      z.literal(24),
      z.literal(32),
      z.literal(36),
      z.literal(40),
    ])
    .optional(),
  description: z.string().optional(),
  offer_text: z.string().optional(),
  expectations_text: z.string().optional(),
  skill_tags: VacancyTagSchema.array().optional(),
  trait_tags: VacancyTagSchema.array().optional(),
  education_tags: VacancyTagSchema.array().optional(),
});

export type VacancyCreate = z.infer<typeof VacancyCreateSchema>;
