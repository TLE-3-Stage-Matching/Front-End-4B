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
import { useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/queryClient";
import { toast } from "sonner";
import { BasicInfo } from "./-components/basic-info";
import { SkillTagsField } from "./-components/skill-tags-field";
import { TraitTagsField } from "./-components/trait-tags-field";
import { EducationField } from "./-components/education-field";
import { DescriptionFields } from "./-components/description-fields";

export const Route = createFileRoute("/_company/vacancies/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const queryClient = useQueryClient();

  const form = useVacancyForm({
    defaultValues: {
      title: "",
      hours_per_week: undefined as number | undefined,
      skill_tags: [] as { id: number; name: string }[],
      trait_tags: [] as { id: number; name: string }[],
      education_tags: [] as { id: number; name: string }[],
      description: "",
      offer_text: "",
      expectations_text: "",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      setShowSuccess(false);
      try {
        const makeTag = (t: { id: number; name: string }, type: string) =>
          t?.id && t.id > 0 ? { id: t.id } : { name: t.name, tag_type: type };

        const tags = [
          ...value.skill_tags.map((t) => makeTag(t, "skill")),
          ...value.trait_tags.map((t) => makeTag(t, "trait")),
          ...value.education_tags.map((t) => makeTag(t, "education")),
        ];

        const payload = {
          title: value.title,
          hours_per_week: value.hours_per_week,
          description: value.description,
          offer_text: value.offer_text,
          expectations_text: value.expectations_text,
          status: "open",
          tags,
        };

        const isEdit = (value as any)?.id;
        const url = isEdit
          ? `/api/company/vacancies/${(value as any).id}`
          : "/api/company/vacancies";
        const method = isEdit ? "PATCH" : "POST";

        const res = await apiFetch(url, {
          method,
          body: JSON.stringify(payload),
        });

        toast.success(
          isEdit ? "Vacature bijgewerkt" : "Vacature succesvol aangemaakt",
        );
        queryClient.invalidateQueries({
          queryKey: ["/api/tags?tag_type=skill"],
        });
        queryClient.invalidateQueries({
          queryKey: ["/api/tags?tag_type=trait"],
        });
        queryClient.invalidateQueries({
          queryKey: ["/api/tags?tag_type=education"],
        });
        queryClient.invalidateQueries({ queryKey: ["/api/company/vacancies"] });

        setShowSuccess(true);
        return res;
      } catch (err: any) {
        toast.error(err?.message ?? "Fout bij aanmaken vacature");
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
                <BasicInfo form={form} />
                <SkillTagsField form={form} />
                <TraitTagsField form={form} />
                <EducationField form={form} />
                <DescriptionFields form={form} />

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
                        side="top"
                        className={
                          canSave
                            ? "bg-accent text-card"
                            : "bg-destructive text-white"
                        }
                        arrowClassName={
                          canSave
                            ? "bg-accent fill-accent"
                            : "bg-destructive fill-destructive"
                        }
                      >
                        {canSave
                          ? "Klik om vacature op te slaan"
                          : "Vul de vereisde velden in om op te slaan."}
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
