import { createFileRoute } from "@tanstack/react-router";
import { SkillsEdit } from "./-components/skills-edit";
import { LanguagesEdit } from "./-components/languages-edit";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
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
import { AboutMeEdit } from "./-components/about-me-edit";
import { PrefrencesEdit } from "./-components/prefrences-edit";

export const Route = createFileRoute("/_student/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="mx-auto flex flex-col gap-8 py-12 md:w-xl lg:w-4xl">
      <Card className="h-100" id="personal-data">
        <CardHeader>
          <CardTitle asChild>
            <h2>Persoonsgegevens</h2>
          </CardTitle>
          <CardAction className="flex gap-2">
            <PersonalInfoEdit />
            <PrefrencesEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <PersonalInfoSection />
        </CardContent>
        <CardFooter className="mt-auto">
          <PrefrencesSection />
        </CardFooter>
      </Card>
      <Card id="bio">
        <CardHeader>
          <CardTitle asChild>
            <h2>Over mij</h2>
          </CardTitle>
          <CardAction>
            <AboutMeEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <AboutMeSection />
        </CardContent>
      </Card>
      <Card className="h-100" id="experience">
        <CardHeader>
          <CardTitle asChild>
            <h2>Ervaringen</h2>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card id="skills">
        <CardHeader>
          <CardTitle asChild>
            <h2>Vaardigheden</h2>
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
            <h2>Eigenschappen</h2>
          </CardTitle>
          <CardAction className="space-x-2">
            <QualitiesEdit />
            <LanguagesEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <QualitiesSection />
            <LanguagesSection />
          </div>
        </CardContent>
      </Card>
      <Card className="h-100" id="preferences">
        <CardHeader>
          <CardTitle asChild>
            <h2>Stage voorkeuren</h2>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="h-100" id="companies">
        <CardHeader>
          <CardTitle asChild>
            <h2>Favoriete bedrijven</h2>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="h-100" id="vacancies">
        <CardHeader>
          <CardTitle asChild>
            <h2>Opgeslagen opdrachten</h2>
          </CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
}
