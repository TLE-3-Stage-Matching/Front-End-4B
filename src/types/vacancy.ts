import z from "zod";

export const VacancySchema = z.object({
  id: z.int(),
  title: z.string(),
  company: z.string(),
  hours_per_week: z.int(),
  description: z.string(),
  get requirements() {
    return z.array(Tag);
  },
  offer_text: z.string(),
  expectations_text: z.string(),
  matchscore: z.int(),
  favorite: z.boolean(),
});

const Tag = z.object({
  id: z.int(),
  name: z.string(),
});

export type Vacancy = z.infer<typeof VacancySchema>;
