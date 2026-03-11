import { FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import type { Language, SkillQuality } from "@/types/user-profile";
import {
  CircleCheck,
  CircleDashed,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

function PersonalInfoSection() {
  // Temporary data
  const personalInfo = {
    firstName: "John",
    infix: "van",
    lastName: "Doe",
    ZIPCode: "1234 AB",
    github: "https://github.com/johndoe",
    linkin: "https://linkedin.com/in/johndoe",
    website: "https://johndoe.com",
  };

  const fullName = [
    personalInfo.firstName,
    personalInfo.infix,
    personalInfo.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{fullName}</h1>
          {personalInfo.ZIPCode && (
            <p className="text-sm text-primary" aria-label="Postcode">
              {personalInfo.ZIPCode}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1 text-accent">
          {personalInfo.github && (
            <Button variant="ghost" size="icon-sm" asChild>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github />
              </a>
            </Button>
          )}
          {personalInfo.linkin && (
            <Button variant="ghost" size="icon-sm" asChild>
              <a
                href={personalInfo.linkin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
            </Button>
          )}
          {personalInfo.website && (
            <Button variant="ghost" size="icon-sm" asChild>
              <a
                href={personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
              >
                <Globe />
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

function AboutMeSection() {
  const personalInfo = {
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };
  return (
    <section>
      {personalInfo.about ? (
        <p className="text-sm">{personalInfo.about}</p>
      ) : (
        <p>Geen info</p>
      )}
    </section>
  );
}

function SkillsSection() {
  const { data, isLoading } = useQuery<{
    data: Array<{ tag_id: number; is_active: boolean; tag: { id: number; name: string } }>;
  }>({
    queryKey: ["/api/student/tags"],
  });

  const skills: SkillQuality[] = (data?.data ?? []).map((item) => ({
    id: item.tag_id,
    name: item.tag.name,
    toggle: item.is_active,
  }));

  if (isLoading) {
    return (
      <section className="mx-auto flex h-fit flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-20 rounded-r-full" />
        ))}
      </section>
    );
  }

  return (
    <section className="mx-auto flex h-fit flex-wrap gap-2">
      {skills.map((skill) => (
        <SkillQualityBadge SkillQuality={skill} key={skill.id} />
      ))}
    </section>
  );
}

function QualitiesSection() {
  const { data, isLoading } = useQuery<{
    data: Array<{ tag_id: number; is_active: boolean; tag: { id: number; name: string } }>;
  }>({
    queryKey: ["/api/student/tags"],
  });

  const properties: SkillQuality[] = (data?.data ?? []).map((item) => ({
    id: item.tag_id,
    name: item.tag.name,
    toggle: item.is_active,
  }));

  if (isLoading) {
    return (
      <section className="mx-auto flex h-fit flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-20 rounded-r-full" />
        ))}
      </section>
    );
  }

  return (
    <section className="mx-auto flex h-fit flex-wrap gap-2">
      {properties.map((property) => (
        <SkillQualityBadge SkillQuality={property} key={property.id} />
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
        <Language language={language} key={language.id} />
      ))}
    </section>
  );
}

function SkillQualityBadge({ SkillQuality }: { SkillQuality: SkillQuality }) {
  return (
    <Badge asChild>
      <FieldLabel htmlFor={SkillQuality.name}>
        {SkillQuality.name}
        {SkillQuality.toggle ? (
          <CircleCheck id={SkillQuality.name} aria-label="Aan" />
        ) : (
          <CircleDashed id={SkillQuality.name} aria-label="Uit" />
        )}
      </FieldLabel>
    </Badge>
  );
}

function Language({ language }: { language: Language }) {
  return (
    <Badge asChild>
      <FieldLabel htmlFor={language.name}>
        {language.name}

        <p className="pr-2 pl-1 text-sm font-semibold" id={language.name}>
          {language.level?.name}
        </p>
      </FieldLabel>
    </Badge>
  );
}

export {
  PersonalInfoSection,
  AboutMeSection,
  SkillsSection,
  QualitiesSection,
  LanguagesSection,
};
