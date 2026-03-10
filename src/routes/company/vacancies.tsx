import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FormSaveButton } from "@/components/ui/form-save-button";
import { useVacancyForm } from "@/hooks/vacancy.form";
import { VacancySchema } from "@/types/vacancy";

export const Route = createFileRoute("/company/vacancies")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useVacancyForm({
    defaultValues: {
      title: "",
      hours_per_week: undefined,
      description: "",
      offer_text: "",
      expectations_text: "",
      tags: [],
    },
    validators: {
      onChange: VacancySchema,
      onSubmit: VacancySchema,
    },
    onSubmit: async ({ value }) => {
      // double-check form validity before acting
      if (!form.getState().meta.isValid) {
        return;
      }
      setIsLoading(true);
      setShowSuccess(false);
      // TODO: call API POST /company/vacancies with token
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccess(true);
      });
      console.log("Vacancy submit:", value);
    },
  });

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center px-2 py-16 sm:px-0">
      <h1 className="mb-10 text-center text-5xl font-bold">
        Vacature aanmaken
      </h1>

      <div className="w-full max-w-3xl">
        <Card className="bg-white text-foreground">
          <CardHeader>
            <CardTitle>Nieuwe vacature</CardTitle>
            <CardDescription className="text-foreground">
              Vul de gegevens in voor de vacature.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="vacancy"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                <form.AppField
                  name="title"
                  children={(field) => <field.TitleField />}
                />
                <form.AppField
                  name="hours_per_week"
                  children={(field) => <field.HoursSelect />}
                />
                <form.AppField
                  name="tags"
                  children={(field) => <field.TagsField />}
                />
                <form.AppField
                  name="description"
                  children={(field) => (
                    <field.DescriptionField
                      label="Informatie over de stage"
                      placeholder="Bijv. Wat maakt deze stage uniek? Waarom is dit leuk?"
                    />
                  )}
                />
                <form.AppField
                  name="offer_text"
                  children={(field) => (
                    <field.DescriptionField
                      label="Wat bieden wij?"
                      placeholder="Bijv. Taken, arbeidsvoorwaarden, stagevergoeding"
                    />
                  )}
                />
                <form.AppField
                  name="expectations_text"
                  children={(field) => (
                    <field.DescriptionField
                      label="Wat verwachten we van jou?"
                      placeholder="Bijv. Vereiste vaardigheden, taken, gewenste opleiding"
                    />
                  )}
                />

                <form.Subscribe
                  selector={(state) => ({
                    canSave: state.canSubmit && state.isDirty,
                  })}
                  children={({ canSave }) => (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <FormSaveButton
                          className="mt-4"
                          enabled={canSave}
                          loading={isLoading}
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className={
                          canSave
                            ? "bg-background text-foreground"
                            : "bg-destructive text-white"
                        }
                      >
                        {canSave
                          ? "Klik om vacature op te slaan"
                          : "Vul alle velden in om op te slaan."}
                      </TooltipContent>
                    </Tooltip>
                  )}
                />

                {showSuccess && (
                  <span
                    className="animate-fade-in mt-2 block text-sm text-green-600"
                    role="status"
                  >
                    Vacature succesvol toegevoegd!
                  </span>
                )}
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
