import z from "zod";

export const BaseSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type BaseType = z.infer<typeof BaseSchema>;

// Personal Info

export const AboutMeSchema = z.object({
  postalCode: z
    .string()
    .refine(
      (val) => val.length === 0 || /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/.test(val),
      {
        message: "Ongeldige postcode",
      },
    ),
  bio: z.string(),
});

export const PersonalInfoSchema = z.object({
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
  phone: z
    .string()
    .refine(
      (val) =>
        val.length === 0 ||
        /^\+?[0-9]{1,4}?[-.\s()]?\(?[0-9]{1,4}\)?(?:[-.\s()]?[0-9]{1,4}){2,4}$/.test(
          val,
        ),
      { message: "Ongeldig telefoonnummer" },
    ),
  password: z.string().refine((v) => !v || v.length >= 8, {
    message: "Wachtwoord moet minimaal 8 tekens bevatten",
  }),
  confirm_password: z.string(),
});

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

// Prefrences

export const JobFunctionSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type JobFunction = z.infer<typeof JobFunctionSchema>;

export const PrefrenceSchema = z.object({
  jobFunction: JobFunctionSchema,
  hours: z
    .tuple([
      z
        .number()
        .min(1, "Je moet minimaal 1 uur invullen als minimum")
        .max(40, "Je mag maximaal 40 uur invullen als minimum"),
      z
        .number()
        .min(1, "Je moet minimaal 1 uur invullen als maximum")
        .max(40, "Je mag maximaal 40 uur invullen als maximum"),
    ])
    .refine(([min, max]) => max >= min, {
      message: "Maximum moet groter of gelijk zijn aan minimum",
    }),
  distance: z
    .number()
    .min(0, "Afstand mag niet negatief zijn")
    .max(100, "Afstand mag maximaal 100 km zijn"),
  compensation: z
    .number()
    .min(0, "Compensatie mag niet negatief zijn")
    .max(100, "Compensatie mag maximaal 100 € zijn"),
  has_drivers_license: z.boolean(),
  notes: z.string().max(200, "Notities mogen maximaal 200 karakters bevatten"),
});

export type Prefrence = z.infer<typeof PrefrenceSchema>;

// Experiences

export const ExperienceSchema = z.object({
  title: z
    .string()
    .max(255, "Titel te lang")
    .nonempty("Je moet een titel invullen"),
  company_name: z
    .string()
    .max(255, "Bedrijf te lang")
    .nonempty("Je moet een bedrijf invullen"),
  start_date: z.string().length(10, "Datum format inccorect"),
  end_date: z.string().length(10, "Datum format inccorect").or(z.string().length(0)),
  description: z.string().max(500, "Omschrijving te lang"),
});

export type Experience = z.infer<typeof ExperienceSchema>;
