import { createFileRoute } from "@tanstack/react-router";
import { SkillsEdit } from "./-components/skills-edit";
import { LanguagesEdit } from "./-components/languages-edit";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QualitiesEdit } from "./-components/qualities-edit";
import {
  AboutMeSection,
  LanguagesSection,
  PersonalInfoSection,
  PrefrencesSection,
  QualitiesSection,
  SkillsSection,
  VacanciesSection,
} from "./-components/section";
import { PersonalInfoEdit } from "./-components/personal-info-edit";
import { PrefrencesEdit } from "./-components/prefrences-edit";
import { AboutMeEdit } from "./-components/about-me-edit";
import VacancyCard from "@/routes/_student/vacancies/-components/vacancy-card.tsx";
import { H1, H2 } from "@/components/ui/headings.tsx";

export const Route = createFileRoute("/_student/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="mx-auto flex flex-col gap-4">
      <H1>Studenten profiel</H1>

      <Card id="personal-data">
        <CardHeader>
          <CardTitle asChild>
            <H2>Persoonsgegevens</H2>
          </CardTitle>
          <CardAction>
            <PersonalInfoEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <PersonalInfoSection />
        </CardContent>
      </Card>
      <Card id="bio">
        <CardHeader>
          <CardTitle asChild>
            <H2>Profiel informatie</H2>
          </CardTitle>
          <CardAction>
            <AboutMeEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <AboutMeSection />
        </CardContent>
      </Card>
      <Card id="experience">
        <CardHeader>
          <CardTitle asChild>
            <H2>Ervaringen</H2>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card id="skills">
        <CardHeader>
          <CardTitle asChild>
            <H2>Vaardigheden</H2>
          </CardTitle>
          <CardAction>
            <SkillsEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <SkillsSection />
        </CardContent>
      </Card>
      <Card id="qualities">
        <CardHeader>
          <CardTitle asChild>
            <H2>Eigenschappen</H2>
          </CardTitle>
          <CardAction className="space-x-2">
            <QualitiesEdit />
            <LanguagesEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <QualitiesSection />
            <LanguagesSection />
          </div>
        </CardContent>
      </Card>
      <Card id="preferences">
        <CardHeader>
          <CardTitle asChild>
            <H2>Stage voorkeuren</H2>
          </CardTitle>
          <CardAction>
            <PrefrencesEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <PrefrencesSection />
        </CardContent>
      </Card>
      <Card id="vacancies">
        <CardHeader>
          <CardTitle asChild>
            <H2>Opgeslagen opdrachten</H2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <VacanciesSection />
        </CardContent>
      </Card>
    </section>
  );
}
