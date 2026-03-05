import { useState } from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRegisterForm } from "@/hooks/register.form";
import { RegisterCompanySchema } from "@/types/user";
import { FieldGroup } from "@/components/ui/field";

export const Route = createFileRoute(
  "/internship-coordinator/register-company-account",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useRegisterForm({
    defaultValues: {
      name: "",
      email: "",
    },
    validators: {
      onChange: RegisterCompanySchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      setShowSuccess(false);
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccess(true);
      });
      console.log(value);
    },
  });

  return (
    <section className="mx-auto flex min-h-[70vh] w-[80vw] max-w-3xl flex-col items-center py-16">
      <h1 className="mb-10 text-center text-5xl font-bold">
        Bedrijf toevoegen
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="w-full max-w-md"
      >
        <Tabs defaultValue="name" className="w-full">
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
                <FieldGroup>
                  <form.AppField
                    name="name"
                    children={(field) => (
                      <field.NameField label="Bedrijfsnaam" />
                    )}
                  />
                </FieldGroup>
                <form.Subscribe
                  selector={(state) => ({
                    canSave: state.canSubmit && state.isDirty,
                  })}
                  children={({ canSave }) => (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <FormSaveButton
                          enabled={canSave}
                          loading={isLoading}
                          ariaLabel="Bedrijf opslaan"
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
                  )}
                />
                {showSuccess && (
                  <span
                    className="animate-fade-in mt-2 block text-sm text-green-600"
                    role="status"
                  >
                    Bedrijf succesvol toegevoegd!
                  </span>
                )}
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
                <FieldGroup>
                  <form.AppField
                    name="email"
                    children={(field) => (
                      <field.EmailField label="E-mailadres" />
                    )}
                  />
                </FieldGroup>
                <form.Subscribe
                  selector={(state) => ({
                    canSave: state.canSubmit && state.isDirty,
                  })}
                  children={({ canSave }) => (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <FormSaveButton
                          enabled={canSave}
                          loading={isLoading}
                          ariaLabel="Bedrijf opslaan"
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
                  )}
                />
                {showSuccess && (
                  <span
                    className="animate-fade-in mt-2 block text-sm text-green-600"
                    role="status"
                  >
                    Bedrijf succesvol toegevoegd!
                  </span>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </section>
  );
}
