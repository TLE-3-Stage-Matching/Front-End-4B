import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { createFileRoute } from "@tanstack/react-router";
// import { SkillsEdit } from "./-components/skills-edit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger>Test</DialogTrigger>
            <DialogContent>
              {/* <SkillsEdit /> */}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Eigenschappen</CardTitle>
        </CardHeader>
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
