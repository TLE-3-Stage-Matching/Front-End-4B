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
import { PropertiesEdit } from "./-components/properties-edit";
import {
  LanguagesSection,
  PropertiesSection,
  SkillsSection,
} from "./-components/section";

export const Route = createFileRoute("/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Persoons gegevens</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Over mij</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ervaringen</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Vaardigheden</CardTitle>
          <CardAction>
            <SkillsEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <SkillsSection />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Eigenschappen</CardTitle>
          <CardAction className="space-x-2">
            <PropertiesEdit />
            <LanguagesEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <PropertiesSection />
            <LanguagesSection />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Stage voorkeuren</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Favoriete bedrijven</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>opgeslagen opdrachten</CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
}
