import { FieldLabel } from "@/components/ui/field";
import { type Language, type SkillQuality } from "@/types/user-profile";
import { CircleCheck, CircleDashed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import section from "@/components/company/Section.tsx";
import { H3 } from "@/components/ui/headings.tsx";
import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";

function PersonalInfoSection() {
  const { data, isLoading } = useQuery<{
    data: {
      first_name: string;
      middle_name: string | null;
      last_name: string;
      email: string;
      phone: string | null;
    };
  }>({
    queryKey: ["/api/student/profile"],
  });

  if (isLoading) {
    return (
      <section className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-36" />
      </section>
    );
  }

  const user = data?.data;
  const fullName = [user?.first_name, user?.middle_name, user?.last_name]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{fullName}</h3>
          {user?.email && (
            <Button variant="link" asChild className="h-auto p-0 text-sm">
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </Button>
          )}
          {user?.phone && (
            <p className="text-sm text-primary" aria-label="Telefoonnummer">
              {user.phone}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function AboutMeSection() {
  const { data, isLoading } = useQuery<{
    data: {
      id: number;
      student_profile: {
        bio: string;
        postal_code: string;
      };
    };
  }>({
    queryKey: ["/api/student/profile"],
  });

  if (isLoading) {
    return (
      <section className="space-y-2">
        <Skeleton className="h-6 w-62" />
        <Skeleton className="h-6 w-23" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="mt-10 h-6 w-36" />
      </section>
    );
  }

  const profile = data?.data;

  return (
    <section>
      {profile?.student_profile.bio ? (
        <p>{profile?.student_profile.bio}</p>
      ) : (
        <p>Geen info</p>
      )}
      <div className="pt-10">
        <p>
          <span className="font-semibold text-primary">Postcode:</span>{" "}
          {profile?.student_profile.postal_code ?? "Niet Ingevult"}
        </p>
      </div>
    </section>
  );
}

function SkillsSection() {
  const { data, isLoading } = useQuery<{
    data: Array<{
      tag_id: number;
      is_active: boolean;
      tag: { id: number; name: string };
    }>;
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
    data: Array<{
      tag_id: number;
      is_active: boolean;
      tag: { id: number; name: string };
    }>;
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
      <section className="flex h-fit flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-20 rounded-r-full" />
        ))}
      </section>
    );
  }

  return (
    <section className="flex h-fit flex-wrap gap-2">
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
    <section className="flex h-fit flex-wrap gap-2">
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
function PrefrencesSection() {
  const { data, isLoading } = useQuery<{
    data: {
      desired_role_tag_id: number | null;
      hours_per_week_min: number | null;
      hours_per_week_max: number | null;
      max_distance_km: number | null;
      compensation: number | null;
      has_drivers_license: boolean;
      notes: string | null;
      desired_role_tag: { id: number; name: string } | null;
    };
  }>({
    queryKey: ["/api/student/preferences"],
  });

  if (isLoading) {
    return (
      <section className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <div className="flex flex-wrap items-center gap-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
        </div>
      </section>
    );
  }

  const pref = data?.data;

  return (
    <section className="space-y-2">
      <p>
        <span className="font-semibold text-accent">Functie:</span>{" "}
        {pref?.desired_role_tag?.name ?? "Geen keuze"}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <p>
          <span className="font-semibold text-primary tabular-nums">
            Uren per week:
          </span>{" "}
          {pref?.hours_per_week_min != null && pref?.hours_per_week_max != null
            ? `${pref.hours_per_week_min} – ${pref.hours_per_week_max}`
            : "Geen keuze"}
        </p>
        <p>
          <span className="font-semibold text-primary">Afstand in Km:</span>{" "}
          {pref?.max_distance_km ?? "Geen keuze"}
        </p>
        <p>
          <span className="font-semibold text-primary">Compensatie:</span>{" "}
          {pref?.compensation ?? "Geen keuze"}
        </p>
        <p>
          <span className="font-semibold text-primary">Rijbewijs:</span>{" "}
          {pref?.has_drivers_license ? "Ja" : "Nee"}
        </p>
      </div>
      {pref?.notes && (
        <p className="text-sm text-muted-foreground">{pref.notes}</p>
      )}
    </section>
  );
}

function VacanciesSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/student/saved-vacancies"],
  });

  const vacancies = data;
  console.log(vacancies);

  return (
    <section className="flex gap-2">
      {vacancies != null && vacancies != [] ? (
        vacancies.data.slice(0, 3).map((vacancy) => (
          <Card className="flex flex-1 flex-col justify-between">
            <CardContent className="flex flex-col">
              <H3>{vacancy.vacancy.title}</H3>
              <p>{}</p>
            </CardContent>
            <CardFooter>
              <div className="text-right">
                <Button asChild>
                  <Link
                    to={"/vacancies/$id"}
                    params={{ id: vacancy.vacancy_id.toString() }}
                  >
                    Bekijken
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>er zijn geen opdrachten</p>
      )}
    </section>
  );
}

export {
  PersonalInfoSection,
  PrefrencesSection,
  AboutMeSection,
  SkillsSection,
  QualitiesSection,
  LanguagesSection,
  VacanciesSection,
};
