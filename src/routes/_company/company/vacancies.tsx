import { useState, useEffect } from "react";
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
import { VacancyCreateSchema } from "@/types/vacancy";
// import { apiFetch } from "@/lib/queryClient";
import { useAuthStore } from "@/store/auth";
import { router } from "@/router";
import { toast } from "sonner";

export const Route = createFileRoute("/_company/company/vacancies")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  let persisted: any = null;
  try {
    persisted = JSON.parse(localStorage.getItem("vacancy_form") || "null");
  } catch (e) {
    persisted = null;
  }

  const form = useVacancyForm({
    defaultValues: {
      title: "",
      hours_per_week: undefined,
      description: "",
      offer_text: "",
      expectations_text: "",
      skill_tags: [],
      trait_tags: [],
      major_tags: [],
      ...persisted,
    },
    validators: {
      onChange: VacancyCreateSchema,
      onSubmit: VacancyCreateSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      setShowSuccess(false);
      try {
        const skillItems = (value.skill_tags || []).map((t: any) =>
          t.id && t.id > 0 ? { id: t.id } : { name: t.name, tag_type: "skill" },
        );

        const traitItems = (value.trait_tags || []).map((t: any) =>
          t.id && t.id > 0 ? { id: t.id } : { name: t.name, tag_type: "trait" },
        );

        const majorItems = (value.major_tags || []).map((t: any) =>
          t.id && t.id > 0 ? { id: t.id } : { name: t.name, tag_type: "major" },
        );

        const payload: any = {
          title: value.title,
          hours_per_week: value.hours_per_week,
          description: value.description || null,
          offer_text: value.offer_text || null,
          expectations_text: value.expectations_text || null,
          tags: [...skillItems, ...traitItems, ...majorItems],
        };

        const { token, logout } = useAuthStore.getState();
        const res = await fetch("/api/company/vacancies", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });

        if (res.status === 401) {
          logout();
          router.navigate({ to: "/login" });
          toast.error(`Unauthorized (401)`);
          return;
        }

        const body = await res.json().catch(() => null);

        // Always show status code and any message returned by the server
        const serverMessage =
          body?.message || body?.error || body?.detail || res.statusText;

        if (res.status >= 200 && res.status < 300) {
          setShowSuccess(true);
          try {
            localStorage.removeItem("vacancy_form");
          } catch (e) {}
          toast.success(`Vacature succesvol toegevoegd (${res.status})`);
          router.navigate({ to: "/company/overview" });
          return;
        }

        // Handle common client/server errors with explicit toasts
        if (res.status === 400) {
          toast.error(
            `Fout 400: Ongeldig verzoek${serverMessage ? ` — ${serverMessage}` : ""}`,
          );
          return;
        }

        if (res.status === 422) {
          toast.error(
            `Fout 422: Validatiefout${serverMessage ? ` — ${serverMessage}` : ""}`,
          );
          return;
        }

        if (res.status >= 500) {
          toast.error(
            `Serverfout ${res.status}${serverMessage ? ` — ${serverMessage}` : ""}`,
          );
          return;
        }

        // Fallback for other status codes
        toast.error(
          `Fout ${res.status}${serverMessage ? `: ${serverMessage}` : ""}`,
        );
      } catch (err) {
        console.error(err);
        toast.error("Kon vacature niet opslaan. Probeer het opnieuw.");
      } finally {
        setIsLoading(false);
      }
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
                  name="skill_tags"
                  children={(field) => <field.SkillTagsField />}
                />
                <form.AppField
                  name="trait_tags"
                  children={(field) => <field.TraitTagsField />}
                />
                <form.AppField
                  name="major_tags"
                  children={(field) => <field.MajorField />}
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
                          onClick={() => form.handleSubmit()}
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className={
                          canSave
                            ? "bg-accent fill-accent text-card"
                            : "bg-destructive text-white"
                        }
                        arrowClassName={
                          canSave
                            ? "bg-accent fill-accent text-card"
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

                <form.Subscribe
                  selector={(s) => ({ values: s.values })}
                  children={({ values }) => {
                    function Persistor({ values }: { values: any }) {
                      useEffect(() => {
                        try {
                          localStorage.setItem(
                            "vacancy_form",
                            JSON.stringify(values),
                          );
                        } catch (e) {}
                      }, [values]);
                      return null;
                    }

                    return <Persistor values={values} />;
                  }}
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
