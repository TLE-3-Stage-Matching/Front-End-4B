import z from "zod";

export const BaseSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type BaseType = z.infer<typeof BaseSchema>;

// Skills & Properties
export const SkillQualitySchema = z.object({
  id: z.number(),
  name: z.string(),
  toggle: z.boolean().optional(),
});

export type SkillQuality = z.infer<typeof SkillQualitySchema>;

const selectedSkillsQualityArraySchema = SkillQualitySchema.array().refine(
  (skills) => {
    const activeSkills = skills.filter((skill) => skill.toggle === true);
    return activeSkills.length <= 6;
  },
  {
    message: "Maximaal 6 kunnen actief zijn",
  },
);

export const SelectedSkillQualitySchema = z.object({
  SkillQualities: selectedSkillsQualityArraySchema,
});

export type SelectedSkillProps = z.infer<typeof SelectedSkillQualitySchema>;

// Language
export const LanguageLevelSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type LanguageLevel = z.infer<typeof LanguageLevelSchema>;

export const LanguageSchema = z.object({
  id: z.number(),
  name: z.string(),
  level: LanguageLevelSchema.optional(),
});

export type Language = z.infer<typeof LanguageSchema>;

export const SelectedLanguagesSchema = z.object({
  languages: LanguageSchema.array(),
});

export type SelectedLanguages = z.infer<typeof SelectedLanguagesSchema>;

// Personal Info

const LinkSchema = z
  .string()
  .transform((val) => {
    if (!val || val.length === 0) return val;
    if (!val.startsWith("http://") && !val.startsWith("https://")) {
      return `https://${val}`;
    }
    return val;
  })
  .pipe(z.union([z.url(), z.string().length(0)], "Ongeldige link"));

export const PersonalInfoSchema = z.object({
  firstName: z.string().max(255, "Te lang"),
  infix: z.string().max(255, "Te lang").or(z.string().length(0)),
  lastName: z.string().max(255, "Te lang"),
  ZIPCode: z
    .string()
    .refine(
      (val) => val.length === 0 || /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/.test(val),
      {
        message: "Ongeldige postcode",
      },
    ),
  github: LinkSchema,
  linkin: LinkSchema,
  website: LinkSchema,
});

export const AboutMeSchema = z.object({
  about: z.string(),
});

// Prefrences

export const JobFunctionSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type JobFunction = z.infer<typeof JobFunctionSchema>;

export const PrefrencesSchema = z.object({
  jobFunction: JobFunctionSchema,
  hours: z
    .tuple([z.number().min(1).max(168), z.number().min(1).max(168)])
    .refine(([min, max]) => max >= min, {
      message: "Max moet groter of gelijk zijn aan min",
    }),
  distance: z.number().min(0).max(100),
  has_drivers_license: z.boolean(),
  notes: z.string().max(500),
});

export type Prefrences = z.infer<typeof PrefrencesSchema>

// Combined form
export const UserProfileSchema = z.object({
  ...PersonalInfoSchema.shape,
  skills: selectedSkillsQualityArraySchema,
  properties: selectedSkillsQualityArraySchema,
  ...SelectedLanguagesSchema.shape,
  ...PrefrencesSchema.shape,
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
