import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FormSaveButton } from "@/components/ui/form-save-button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Route = createFileRoute(
  "/internship-coordinator/register-company-account",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isEmailValid = useMemo(() => {
    const email = companyEmail.trim();
    if (email.length === 0) return false;
    if (email.includes(" ")) return false;

    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
  }, [companyEmail]);

  const canSave = companyName.trim().length > 0 && isEmailValid;

  const errorClass =
    companyEmail.trim().length > 0 && !isEmailValid
      ? "animate-shake border-destructive"
      : "";

  const errorId = "company-email-error";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Saving is indicated with a spinning thing, This is for the user to know that something is actually happening. Now almost invisible, but once it goes through the API.
    if (!canSave) return;
    setIsLoading(true);
    setShowSuccess(false);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setCompanyName("");
      setCompanyEmail("");
    });
  };

  return (
    <section className="mx-auto flex min-h-[70vh] w-[80vw] max-w-3xl flex-col items-center py-16">
      <h1 className="mb-10 text-center text-5xl font-bold">
        Bedrijf toevoegen
      </h1>

      <Tabs defaultValue="name" className="w-full max-w-md">
        <TabsList className="relative z-0 bg-tertiary p-[3px] after:pointer-events-none after:absolute after:inset-x-2 after:-bottom-2 after:-z-10 after:h-2 after:rounded-b-lg after:content-['']">
          <TabsTrigger
            value="name"
            className="cursor-pointer border-2 bg-transparent font-bold text-creme/60 hover:text-creme data-[state=active]:cursor-default data-[state=active]:border-creme data-[state=active]:bg-primary data-[state=active]:text-creme"
          >
            Naam
          </TabsTrigger>
          <TabsTrigger
            value="email"
            className="cursor-pointer border-2 bg-transparent font-bold text-creme/60 hover:text-creme data-[state=active]:cursor-default data-[state=active]:border-creme data-[state=active]:bg-primary data-[state=active]:text-creme"
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
                onSubmit={handleSubmit}
                aria-label="Bedrijfsnaam toevoegen formulier"
              >
                <div className="space-y-2">
                  <Label htmlFor="company-name">Bedrijfsnaam</Label>
                  <Input
                    id="company-name"
                    placeholder="Bedrijfsnaam"
                    className="!text-foreground transition-all duration-150 placeholder:!text-foreground/60"
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    autoFocus
                  />
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FormSaveButton
                      enabled={canSave}
                      loading={isLoading}
                      ariaLabel="Student opslaan"
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className={
                      canSave
                        ? "bg-white text-foreground"
                        : "bg-destructive text-white"
                    }
                    arrowClassName={
                      canSave
                        ? "bg-white fill-white"
                        : "bg-destructive fill-destructive"
                    }
                  >
                    {canSave
                      ? "Klik om bedrijf op te slaan"
                      : "Vul naam en geldig e-mailadres in om op te slaan."}
                  </TooltipContent>
                </Tooltip>
                {showSuccess && (
                  <span
                    className="animate-fade-in mt-2 block text-sm text-green-600"
                    role="status"
                  >
                    Bedrijf succesvol toegevoegd!
                  </span>
                )}
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
                onSubmit={handleSubmit}
                aria-label="Bedrijf e-mail toevoegen formulier"
              >
                <div className="space-y-2">
                  <Label htmlFor="company-email">E-mailadres</Label>
                  <Input
                    id="company-email"
                    type="email"
                    placeholder="E-mailadres"
                    className={`!text-foreground transition-all duration-150 placeholder:!text-foreground/90 ${errorClass}`}
                    value={companyEmail}
                    onChange={(event) => setCompanyEmail(event.target.value)}
                    aria-invalid={
                      companyEmail.trim().length > 0 && !isEmailValid
                    }
                    aria-describedby={
                      companyEmail.trim().length > 0 && !isEmailValid
                        ? errorId
                        : undefined
                    }
                  />
                  {companyEmail.trim().length > 0 && !isEmailValid && (
                    <span
                      id={errorId}
                      className="animate-fade-in mt-1 block text-sm text-destructive"
                      role="alert"
                    >
                      Ongeldig e-mailadres.
                    </span>
                  )}
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FormSaveButton
                      enabled={canSave}
                      loading={isLoading}
                      ariaLabel="Student opslaan"
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className={
                      canSave
                        ? "bg-background text-foreground"
                        : "bg-destructive text-white"
                    }
                    arrowClassName={
                      canSave
                        ? "bg-background fill-background"
                        : "bg-destructive fill-destructive"
                    }
                  >
                    {canSave
                      ? "Klik om bedrijf op te slaan"
                      : "Vul naam en geldig e-mailadres in om op te slaan."}
                  </TooltipContent>
                </Tooltip>
                {showSuccess && (
                  <span
                    className="animate-fade-in mt-2 block text-sm text-green-600"
                    role="status"
                  >
                    Bedrijf succesvol toegevoegd!
                  </span>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
