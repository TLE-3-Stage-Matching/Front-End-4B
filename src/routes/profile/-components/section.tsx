import { FieldLabel } from "@/components/ui/field";
import type { Language, SkillQuality } from "@/types/user-profile";
import { CircleCheck, CircleDashed } from "lucide-react";

function SkillsSection() {
  // Temporary data
  const skills = [
    { id: 1, name: "Next.js", toggle: true },
    { id: 2, name: "SvelteKit", toggle: false },
    { id: 3, name: "Nuxt.js", toggle: true },
    { id: 4, name: "Remix", toggle: true },
    { id: 5, name: "Astro", toggle: false },
  ];
  return (
    <section className="mx-auto flex h-fit flex-wrap justify-center gap-2">
      {skills.map((skill) => (
        <SkillQuality SkillQuality={skill} />
      ))}
    </section>
  );
}

function QualitiesSection() {
  // Temporary data
  const properties = [
    { id: 1, name: "Leergierig", toggle: true },
    { id: 2, name: "Meekijken", toggle: false },
    { id: 3, name: "Social", toggle: true },
    { id: 4, name: "anders1", toggle: true },
    { id: 5, name: "anders2", toggle: false },
  ];
  return (
    <section className="mx-auto flex h-fit flex-wrap justify-center gap-2">
      {properties.map((property) => (
        <SkillQuality SkillQuality={property} />
      ))}
    </section>
  );
}

function LanguagesSection() {
  // Temporary data
  const languages = [
    { id: 1, name: "Nederlands", level: { id: 1, name: "A1" } },
    { id: 2, name: "Engels", level: { id: 1, name: "B1" } },
    { id: 3, name: "Spaans", level: { id: 2, name: "B2" } },
    { id: 4, name: "Fins", level: { id: 3, name: "C1" } },
    { id: 5, name: "Zweeds", level: { id: 4, name: "C2" } },
  ];
  return (
    <section className="mx-auto flex h-fit flex-wrap gap-2">
      {languages.map((language) => (
        <Language language={language} />
      ))}
    </section>
  );
}

function SkillQuality({ SkillQuality }: { SkillQuality: SkillQuality }) {
  return (
    <div className="flex w-fit items-center justify-center gap-1 rounded-r-xl bg-primary p-1 pl-2 text-primary-foreground">
      <FieldLabel htmlFor={SkillQuality.name}>{SkillQuality.name}</FieldLabel>
      {SkillQuality.toggle ? (
        <CircleCheck id={SkillQuality.name} className="h-5 w-5" />
      ) : (
        <CircleDashed id={SkillQuality.name} className="h-5 w-5" />
      )}
    </div>
  );
}

function Language({ language }: { language: Language }) {
  return (
    <div className="flex w-fit items-center justify-center gap-1 rounded-r-xl bg-primary py-1 pr-1 pl-2 text-primary-foreground">
      <FieldLabel htmlFor={language.name}>{language.name}</FieldLabel>
      <p className="pr-2 pl-1 text-sm font-semibold">{language.level?.name}</p>
    </div>
  );
}

export { SkillsSection, QualitiesSection, LanguagesSection };
