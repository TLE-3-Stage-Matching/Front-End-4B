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
} from "./-components/section";
import { PersonalInfoEdit } from "./-components/personal-info-edit";
import { PrefrencesEdit } from "./-components/prefrences-edit";
import { AboutMeEdit } from "./-components/about-me-edit";
import { ExperienceCreate, ExperienceSection } from "./-components/experience";

export const Route = createFileRoute("/_student/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="mx-auto flex flex-col gap-8 p-8 lg:px-22">
      <h1 className="text-center">Studenten profiel</h1>

      <Card className="min-h-60" id="personal-data">
        <CardHeader>
          <CardTitle asChild>
            <h2 className="text-xl">Persoonsgegevens</h2>
          </CardTitle>
          <CardAction>
            <PersonalInfoEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <PersonalInfoSection />
        </CardContent>
      </Card>
      <Card id="bio" className="min-h-50">
        <CardHeader>
          <CardTitle asChild>
            <h2 className="text-xl">Profiel informatie</h2>
          </CardTitle>
          <CardAction>
            <AboutMeEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <AboutMeSection />
        </CardContent>
      </Card>
      <Card className="min-h-50" id="experience">
        <CardHeader>
          <CardTitle asChild>
            <h2 className="text-xl">Ervaringen</h2>
          </CardTitle>
          <CardAction>
            <ExperienceCreate />
          </CardAction>
        </CardHeader>
        <CardContent>
          <ExperienceSection />
        </CardContent>
      </Card>
      <Card id="skills" className="min-h-50">
        <CardHeader>
          <CardTitle asChild>
            <h2 className="text-xl">Vaardigheden</h2>
          </CardTitle>
          <CardAction>
            <SkillsEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <SkillsSection />
        </CardContent>
      </Card>
      <Card id="qualities" className="min-h-50">
        <CardHeader>
          <CardTitle asChild>
            <h2 className="text-xl">Eigenschappen</h2>
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
      <Card className="min-h-60" id="preferences">
        <CardHeader>
          <CardTitle asChild>
            <h2 className="text-xl">Stage voorkeuren</h2>
          </CardTitle>
          <CardAction>
            <PrefrencesEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <PrefrencesSection />
        </CardContent>
      </Card>
      <Card className="h-100" id="companies">
        <CardHeader>
          <CardTitle asChild>
            <h2 className="text-xl">Favoriete bedrijven</h2>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="h-100" id="vacancies">
        <CardHeader>
          <CardTitle asChild>
            <h2 className="text-xl">Opgeslagen opdrachten</h2>
          </CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
}
