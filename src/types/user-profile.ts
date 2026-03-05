import z from "zod";

// Skills & Properties
export const SkillQualitySchema = z.object({
  id: z.number(),
  name: z.string(),
  toggle: z.boolean().optional(),
});

export type SkillQuality = z.infer<typeof SkillQualitySchema>;

export const SelectedSkillQualitySchema = z.object({
  SkillQualities: SkillQualitySchema.array(),
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

// Combined form
export const UserProfileSchema = z.object({
  ZIPCode: z
    .string()
    .regex(/^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/, "Ongeldige postcode"),
  skills: SkillQualitySchema.array(),
  properties: SkillQualitySchema.array(),
  languages: LanguageSchema.array(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
