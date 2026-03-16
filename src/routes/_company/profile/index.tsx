import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { FormSaveButton } from "@/components/ui/form-save-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import {
  Section,
  FieldDisplay,
  FilePreview,
} from "@/components/company/profile-components";
import { CompanyProfileSchema } from "@/types/company";
import { useCompanyProfileForm } from "@/hooks/company-profile.form";
import { apiFetch } from "@/lib/queryClient";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SIZE_OPTIONS = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "200+", label: "200+" },
];

export const Route = createFileRoute("/_company/profile/")({
  component: RouteComponent,
});

type CompanyData = Record<string, any>;
type Tag = { id: number; name: string };

function buildFormValues(c: CompanyData) {
  return {
    name: (c.name as string) ?? "",
    email: (c.email as string) ?? "",
    phone: (c.phone as string) ?? "",
    size_category: (c.size_category as string) ?? "1-10",
    description: (c.description as string) ?? "",
    industry_tag_id: (c.industry_tag_id as number | null) ?? null,
    photo_url: (c.photo_url as string) ?? "",
    banner_url: (c.banner_url as string) ?? "",
  };
}

function RouteComponent() {
  const companyQuery = useQuery<{ data: CompanyData }>({
    queryKey: ["/api/company"],
  });

  const tagsQuery = useQuery<{ data: Tag[] }>({
    queryKey: ["/api/tags?tag_type=industry"],
  });

  const isLoading = companyQuery.isPending;
  const isQueryError = companyQuery.isError;

  const industryOptions = (tagsQuery.data?.data ?? []).map((t) => ({
    value: t.id,
    label: t.name,
  }));

  return (
    <section
      className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center px-2 py-16 sm:px-0"
      role="main"
    >
      <h1 className="mb-10 text-center text-5xl font-bold">Bedrijfsprofiel</h1>

      <div className="w-full max-w-3xl">
        <Card className="bg-white text-foreground">
          {isLoading && (
            <>
              <CardHeader>
                <CardTitle>Profiel bekijken</CardTitle>
                <CardDescription className="text-foreground">
                  Bekijk of bewerk de gegevens van het bedrijf voor goedkeuring.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-4">
                  <Spinner className="size-10" />
                </div>
              </CardContent>
            </>
          )}

          {isQueryError && (
            <>
              <CardHeader>
                <CardTitle>Profiel bekijken</CardTitle>
                <CardDescription className="text-foreground">
                  Bekijk of bewerk de gegevens van het bedrijf voor goedkeuring.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  role="alert"
                  className="mb-4 rounded bg-destructive/10 p-3 text-sm text-destructive"
                >
                  Kon bedrijfsgegevens niet laden. Probeer het opnieuw.
                </div>
              </CardContent>
            </>
          )}

          {!isLoading && !isQueryError && companyQuery.data?.data && (
            <CompanyProfilePanel
              key={companyQuery.dataUpdatedAt}
              companyData={companyQuery.data.data}
              industryOptions={industryOptions}
            />
          )}
        </Card>
      </div>
    </section>
  );
}

function CompanyProfilePanel({
  companyData,
  industryOptions,
}: {
  companyData: CompanyData;
  industryOptions: { value: number; label: string }[];
}) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const form = useCompanyProfileForm({
    defaultValues: buildFormValues(companyData),
    validators: { onChange: CompanyProfileSchema },
    onSubmit: async ({ value }) => {
      try {
        await apiFetch("/api/company", {
          method: "PATCH",
          body: JSON.stringify({
            name: value.name,
            email: value.email,
            phone: value.phone,
            size_category: value.size_category,
            description: value.description ?? null,
            industry_tag_id: value.industry_tag_id,
          }),
        });
        setIsEditing(false);
        queryClient.invalidateQueries({ queryKey: ["/api/company"] });
        toast.success("Wijzigingen opgeslagen");
      } catch {
        toast.error("Kon wijzigingen niet opslaan. Probeer het opnieuw.");
      }
    },
  });

  const values = buildFormValues(companyData);
  const industryLabel =
    industryOptions.find((o) => o.value === values.industry_tag_id)?.label ??
    "";

  function handleEditToggle() {
    if (isEditing) {
      if (form.state.isDirty) {
        setShowCancelConfirm(true);
      } else {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  }

  function handleConfirmCancel() {
    setIsEditing(false);
    setShowCancelConfirm(false);
  }

  return (
    <>
      <CardHeader>
        <div className="flex w-full items-start justify-between gap-4">
          <div>
            <CardTitle>
              {isEditing ? "Profiel bewerken" : "Profiel bekijken"}
            </CardTitle>
            <CardDescription className="text-foreground">
              Bekijk of bewerk de gegevens van het bedrijf voor goedkeuring.
            </CardDescription>
          </div>
          <div className="ml-2">
            <Button
              variant="secondary"
              type="button"
              onClick={handleEditToggle}
            >
              {isEditing ? "Annuleer" : "Bewerk"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <Section title="Identiteit" id="section-identiteit">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center justify-center md:col-span-1">
                <FilePreview
                  label="Logo"
                  src={values.photo_url || undefined}
                  alt={`${values.name} logo`}
                  isEditing={false}
                  onFile={() => {}}
                  placeholder="Geen logo"
                />
              </div>

              <div className="md:col-span-2">
                <FieldGroup>
                  {isEditing ? (
                    <>
                      <form.AppField
                        name="name"
                        children={(field) => (
                          <field.InputField label="Bedrijfsnaam" />
                        )}
                      />
                      <form.AppField
                        name="email"
                        children={(field) => (
                          <field.InputField
                            label="E-mailadres"
                            type="email"
                            autocomplete="email"
                          />
                        )}
                      />
                    </>
                  ) : (
                    <>
                      <FieldDisplay label="Bedrijfsnaam" isEditing={false}>
                        <div className="py-2">{values.name}</div>
                      </FieldDisplay>
                      <FieldDisplay label="E-mailadres" isEditing={false}>
                        <div className="py-2">{values.email}</div>
                      </FieldDisplay>
                    </>
                  )}
                </FieldGroup>
              </div>
            </div>
          </Section>

          <Section title="Contact" id="section-contact">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {isEditing ? (
                <>
                  <form.AppField
                    name="phone"
                    children={(field) => (
                      <field.InputField
                        label="Bedrijfstelefoon"
                        autocomplete="tel"
                      />
                    )}
                  />
                  <form.AppField
                    name="industry_tag_id"
                    children={(field) => (
                      <field.IndustrySelectField
                        label="Branche"
                        options={industryOptions}
                      />
                    )}
                  />
                  <form.AppField
                    name="size_category"
                    children={(field) => (
                      <field.SelectField
                        label="Grootte bedrijf"
                        options={SIZE_OPTIONS}
                      />
                    )}
                  />
                </>
              ) : (
                <>
                  <FieldDisplay label="Bedrijfstelefoon" isEditing={false}>
                    <div className="py-2">{values.phone}</div>
                  </FieldDisplay>
                  <FieldDisplay label="Branche" isEditing={false}>
                    <div className="py-2">{industryLabel}</div>
                  </FieldDisplay>
                  <FieldDisplay label="Grootte bedrijf" isEditing={false}>
                    <div className="py-2">{values.size_category}</div>
                  </FieldDisplay>
                </>
              )}
            </div>
          </Section>

          <Section title="Omschrijving" id="section-extra">
            {isEditing ? (
              <form.AppField
                name="description"
                children={(field) => (
                  <field.TextareaField label="Omschrijving" />
                )}
              />
            ) : (
              <FieldDisplay label="Omschrijving" isEditing={false}>
                <div className="py-2">
                  {values.description || (
                    <span className="text-muted-foreground">
                      Geen omschrijving
                    </span>
                  )}
                </div>
              </FieldDisplay>
            )}
          </Section>

          <Section className="border-b-0" title="Media" id="section-media">
            <div className="md:col-span-2">
              <FilePreview
                label="Banner"
                src={values.banner_url || undefined}
                alt={`${values.name} banner`}
                isEditing={false}
                onFile={() => {}}
                placeholder="Geen banner"
              />
            </div>
          </Section>

          <div className="pt-6">
            <div className="flex items-center justify-end">
              {isEditing && (
                <form.Subscribe
                  selector={(s) => ({
                    isDirty: s.isDirty,
                    isSubmitting: s.isSubmitting,
                  })}
                  children={({ isDirty, isSubmitting }) => (
                    <FormSaveButton
                      enabled={isDirty}
                      loading={isSubmitting}
                      ariaLabel="Profiel opslaan"
                    />
                  )}
                />
              )}
            </div>
          </div>
        </form>
      </CardContent>

      <AlertDialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Wijzigingen niet opgeslagen</AlertDialogTitle>
            <AlertDialogDescription>
              Je hebt bewerkte gegevens die nog niet zijn opgeslagen. Weet je
              zeker dat je wilt annuleren?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Terug</AlertDialogCancel>
            <AlertDialogAction
              variant="accent"
              onClick={handleConfirmCancel}
            >
              Annuleren
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
