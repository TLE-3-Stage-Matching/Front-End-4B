import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute(
  "/internship-coordinator/register-company-account",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");

  const isEmailValid = useMemo(() => {
    const email = companyEmail.trim();
    if (email.length === 0) return false;
    if (email.includes(" ")) return false;

    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
  }, [companyEmail]);

  const canSave = companyName.trim().length > 0 && isEmailValid;

  return (
    <section className="mx-auto flex min-h-[70vh] w-[80vw] max-w-3xl flex-col items-center py-16">
      <h1 className="mb-10 text-center text-5xl font-bold">
        Bedrijf toevoegen
      </h1>

      <Tabs defaultValue="name" className="w-full max-w-md">
        <TabsList className="relative z-0 bg-tertiary p-[3px] after:pointer-events-none after:absolute after:inset-x-2 after:-bottom-2 after:-z-10 after:h-2 after:rounded-b-lg after:content-['']">
          <TabsTrigger
            value="name"
            className="cursor-pointer border-2 bg-transparent text-creme/60 hover:text-creme data-[state=active]:cursor-default data-[state=active]:border-creme data-[state=active]:bg-primary data-[state=active]:text-creme"
          >
            Naam
          </TabsTrigger>
          <TabsTrigger
            value="email"
            className="cursor-pointer border-2 bg-transparent text-creme/60 hover:text-creme data-[state=active]:cursor-default data-[state=active]:border-creme data-[state=active]:bg-primary data-[state=active]:text-creme"
          >
            E-mail
          </TabsTrigger>
        </TabsList>

        <TabsContent value="name">
          <Card className="bg-white text-foreground">
            <CardHeader>
              <CardTitle>Naam instellen</CardTitle>
              <CardDescription className="text-foreground">
                Vul hier de naam in van het bedrijf.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="space-y-2">
                  <Label htmlFor="company-name">Bedrijfsnaam</Label>
                  <Input
                    id="company-name"
                    placeholder="Bedrijfsnaam"
                    className="!text-foreground placeholder:!text-foreground/60"
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!canSave}
                  className="bg-chart-2 text-creme hover:bg-chart-2/90 disabled:pointer-events-auto"
                >
                  Opslaan
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card className="bg-white text-foreground">
            <CardHeader>
              <CardTitle>E-mailadres instellen</CardTitle>
              <CardDescription className="text-foreground">
                Vul het e-mailadres in van het bedrijf.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="space-y-2">
                  <Label htmlFor="company-email">E-mailadres</Label>
                  <Input
                    id="company-email"
                    type="email"
                    placeholder="E-mailadres"
                    className="!text-foreground placeholder:!text-foreground/60"
                    value={companyEmail}
                    onChange={(event) => setCompanyEmail(event.target.value)}
                    aria-invalid={
                      companyEmail.trim().length > 0 && !isEmailValid
                    }
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!canSave}
                  className="bg-chart-2 text-creme hover:bg-chart-2/90 disabled:pointer-events-auto"
                >
                  Opslaan
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
