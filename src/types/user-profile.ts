import z from "zod";

// Skills & Properties
export const SkillQualitySchema = z.object({
  id: z.number(),
  name: z.string(),
  toggle: z.boolean().optional(),
});

export type SkillQuality = z.infer<typeof SkillQualitySchema>;

export const SelectedSkillQualitySchema = z.object({
  SkillQualities: SkillQualitySchema.array().refine(
    (skills) => {
      const activeSkills = skills.filter((skill) => skill.toggle === true);
      return activeSkills.length <= 6;
    },
    {
      message: "Maximaal 6 vaardigheden kunnen actief zijn",
    },
  ),
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
      }
    ),
  about: z.string(),
  github: z
    .string()
    .transform((val) => {
      if (!val || val.length === 0) return val;
      if (!val.startsWith("http://") && !val.startsWith("https://")) {
        return `https://${val}`;
      }
      return val;
    })
    .pipe(z.union([z.url(), z.string().length(0)], "Ongeldige link")),
  linkin: z
    .string()
    .transform((val) => {
      if (!val || val.length === 0) return val;
      if (!val.startsWith("http://") && !val.startsWith("https://")) {
        return `https://${val}`;
      }
      return val;
    })
    .pipe(z.union([z.url(), z.string().length(0)], "Ongeldige link")),
  website: z
    .string()
    .transform((val) => {
      if (!val || val.length === 0) return val;
      if (!val.startsWith("http://") && !val.startsWith("https://")) {
        return `https://${val}`;
      }
      return val;
    })
    .pipe(z.union([z.url(), z.string().length(0)], "Ongeldige link")),
});

// Combined form
export const UserProfileSchema = PersonalInfoSchema.extend({
  skills: SkillQualitySchema.array().refine(
    (skills) => {
      const activeSkills = skills.filter((skill) => skill.toggle === true);
      return activeSkills.length <= 6;
    },
    {
      message: "Maximaal 6 vaardigheden kunnen actief zijn",
    },
  ),
  properties: SkillQualitySchema.array().refine(
    (properties) => {
      const activeProperties = properties.filter(
        (prop) => prop.toggle === true,
      );
      return activeProperties.length <= 6;
    },
    {
      message: "Maximaal 6 eigenschappen kunnen actief zijn",
    },
  ),
  languages: LanguageSchema.array(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
