// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { createFileRoute } from "@tanstack/react-router";
// import { SkillsEdit } from "./-components/skills-edit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <Card className={"h-100"} id={"personal-data"}>
        <CardHeader>
          <CardTitle>Persoons gegevens</CardTitle>
        </CardHeader>
      </Card>
      <Card className={"h-100"} id={"bio"}>
        <CardHeader>
          <CardTitle>Over mij</CardTitle>
        </CardHeader>
      </Card>
      <Card className={"h-100"} id={"experience"}>
        <CardHeader>
          <CardTitle>Ervaringen</CardTitle>
        </CardHeader>
      </Card>
      <Card className={"h-100"} id={"skills"}>
        <CardHeader>
          <CardTitle>Vaardigheden</CardTitle>
        </CardHeader>
        <CardContent>
          {/*<Dialog>*/}
          {/*  <DialogTrigger>Test</DialogTrigger>*/}
          {/*  <DialogContent>*/}
          {/*    /!* <SkillsEdit /> *!/*/}
          {/*  </DialogContent>*/}
          {/*</Dialog>*/}
        </CardContent>
      </Card>
      <Card className={"h-100"} id={"qualities"}>
        <CardHeader>
          <CardTitle>Eigenschappen</CardTitle>
        </CardHeader>
      </Card>
      <Card className={"h-100"} id={"preferences"}>
        <CardHeader>
          <CardTitle>Stage voorkeuren</CardTitle>
        </CardHeader>
      </Card>
      <Card className={"h-100"} id={"companies"}>
        <CardHeader>
          <CardTitle>Favoriete bedrijven</CardTitle>
        </CardHeader>
      </Card>
      <Card className={"h-100"} id={"assignments"}>
        <CardHeader>
          <CardTitle>opgeslagen opdrachten</CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
}
