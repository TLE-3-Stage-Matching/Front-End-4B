import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FormSaveButton } from "@/components/ui/form-save-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FieldGroup } from "@/components/ui/field";
import {
  Section,
  FieldDisplay,
  EditableField,
  FilePreview,
} from "@/components/company/profile-components";
import { CompanyProfileSchema } from "@/types/user";

export const Route = createFileRoute("/company/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const initialValues = useMemo(
    () => ({
      // Alle placeholder data, dit zou normaal uit een API call komen.
      name: "Bedrijf BV",
      email: "contact@bedrijf.com",
      address: "Hoofdstraat 1, 1234 AB, Amsterdam",
      industry: "Huishouden en schoonmaak",
      phone: "+31 20 123 4567",
      size: "51-200",
      extra: "Hier kan een korte bedrijfsomschrijving komen te staan.",
      logo: undefined as File | undefined,
      banner: undefined as File | undefined,
    }),
    [],
  );

  const [form, setForm] = useState(() => ({ ...initialValues }));
  const [isEditing, setIsEditing] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    setForm({ ...initialValues });
  }, [initialValues]);

  const isDirty = useMemo(() => {
    return (
      form.name !== initialValues.name ||
      form.email !== initialValues.email ||
      form.address !== initialValues.address ||
      form.industry !== initialValues.industry ||
      form.phone !== initialValues.phone ||
      form.size !== initialValues.size ||
      form.extra !== initialValues.extra ||
      !!form.logo ||
      !!form.banner
    );
  }, [form, initialValues]);

  const logoUrl = useMemo(
    () => (form.logo ? URL.createObjectURL(form.logo) : undefined),
    [form.logo],
  );
  const bannerUrl = useMemo(
    () => (form.banner ? URL.createObjectURL(form.banner) : undefined),
    [form.banner],
  );

  useEffect(() => {
    return () => {
      if (logoUrl) URL.revokeObjectURL(logoUrl);
      if (bannerUrl) URL.revokeObjectURL(bannerUrl);
    };
  }, [logoUrl, bannerUrl]);

  function handleFileChange(key: "logo" | "banner", file?: File) {
    setForm((s) => ({ ...s, [key]: file }));
  }

  function handleSave() {
    // validate with zod
    const result = CompanyProfileSchema.safeParse(form as any);
    if (!result.success) {
      const map: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path?.[0] ?? "");
        if (key) map[key] = issue.message;
      }
      setValidationErrors(map);
      return;
    }

    setValidationErrors({});
    setIsSaving(true);
    setShowSuccess(false);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setIsEditing(false);
    });
    console.log("Saved company profile:", form);
  }

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center px-2 py-16 sm:px-0">
      <h1 className="mb-10 text-center text-5xl font-bold">Bedrijfsprofiel</h1>

      <div className="w-full max-w-3xl">
        <Card className="bg-white text-foreground">
          <CardHeader>
            <div className="flex w-full items-start justify-between gap-4">
              <div>
                <CardTitle>Profiel bekijken</CardTitle>
                <CardDescription className="text-foreground">
                  Bekijk of bewerk de gegevens van het bedrijf voor goedkeuring.
                </CardDescription>
              </div>
              <div className="ml-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    if (isEditing) {
                      if (isDirty) setShowCancelConfirm(true);
                      else setIsEditing(false);
                    } else {
                      setIsEditing(true);
                    }
                  }}
                >
                  {isEditing ? "Annuleer" : "Bewerk"}
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Section>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex items-center justify-center md:col-span-1">
                  <FilePreview
                    label="Logo"
                    src={logoUrl}
                    isEditing={isEditing}
                    onFile={(f) => handleFileChange("logo", f)}
                    placeholder="Geen logo"
                  />
                </div>

                <div className="md:col-span-2">
                  <FieldGroup>
                    <FieldDisplay label="Bedrijfsnaam" isEditing={isEditing}>
                      {isEditing ? (
                        <>
                          <Input
                            value={form.name}
                            onChange={(e) =>
                              setForm((s) => ({ ...s, name: e.target.value }))
                            }
                          />
                          {validationErrors.name && (
                            <div className="mt-1 text-sm text-destructive">
                              {validationErrors.name}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="py-2">{form.name}</div>
                      )}
                    </FieldDisplay>
                    <FieldDisplay label="E-mailadres" isEditing={isEditing}>
                      {isEditing ? (
                        <>
                          <Input
                            value={form.email}
                            onChange={(e) =>
                              setForm((s) => ({ ...s, email: e.target.value }))
                            }
                          />
                          {validationErrors.email && (
                            <div className="mt-1 text-sm text-destructive">
                              {validationErrors.email}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="py-2">{form.email}</div>
                      )}
                    </FieldDisplay>
                  </FieldGroup>
                </div>
              </div>
            </Section>

            <Section>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  {isEditing ? (
                    <>
                      <EditableField
                        label="Adres"
                        value={form.address}
                        onChange={(v) => setForm((s) => ({ ...s, address: v }))}
                        isEditing={isEditing}
                      />
                      {validationErrors.address && (
                        <div className="mt-1 text-sm text-destructive">
                          {validationErrors.address}
                        </div>
                      )}
                    </>
                  ) : (
                    <FieldDisplay label="Adres" isEditing={isEditing}>
                      {form.address}
                    </FieldDisplay>
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <>
                      <EditableField
                        label="Branche"
                        value={form.industry}
                        onChange={(v) =>
                          setForm((s) => ({ ...s, industry: v }))
                        }
                        isEditing={isEditing}
                      />
                      {validationErrors.industry && (
                        <div className="mt-1 text-sm text-destructive">
                          {validationErrors.industry}
                        </div>
                      )}
                    </>
                  ) : (
                    <FieldDisplay label="Branche" isEditing={isEditing}>
                      {form.industry}
                    </FieldDisplay>
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <>
                      <EditableField
                        label="Bedrijfstelefoon"
                        value={form.phone}
                        onChange={(v) => setForm((s) => ({ ...s, phone: v }))}
                        isEditing={isEditing}
                      />
                      {validationErrors.phone && (
                        <div className="mt-1 text-sm text-destructive">
                          {validationErrors.phone}
                        </div>
                      )}
                    </>
                  ) : (
                    <FieldDisplay
                      label="Bedrijfstelefoon"
                      isEditing={isEditing}
                    >
                      {form.phone}
                    </FieldDisplay>
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <>
                      <EditableField
                        label="Grootte bedrijf"
                        value={form.size}
                        onChange={(v) => setForm((s) => ({ ...s, size: v }))}
                        as="select"
                        isEditing={isEditing}
                      />
                      {validationErrors.size && (
                        <div className="mt-1 text-sm text-destructive">
                          {validationErrors.size}
                        </div>
                      )}
                    </>
                  ) : (
                    <FieldDisplay label="Grootte bedrijf" isEditing={isEditing}>
                      {form.size}
                    </FieldDisplay>
                  )}
                </div>
              </div>
            </Section>

            <Section>
              {isEditing ? (
                <>
                  <EditableField
                    label="Extra informatie"
                    value={form.extra}
                    onChange={(v) => setForm((s) => ({ ...s, extra: v }))}
                    as="textarea"
                    isEditing={isEditing}
                  />
                  {validationErrors.extra && (
                    <div className="mt-1 text-sm text-destructive">
                      {validationErrors.extra}
                    </div>
                  )}
                </>
              ) : (
                <FieldDisplay label="Extra informatie" isEditing={isEditing}>
                  {form.extra}
                </FieldDisplay>
              )}
            </Section>

            <Section className="border-b-0">
              <FilePreview
                label="Banner"
                src={bannerUrl}
                isEditing={isEditing}
                onFile={(f) => handleFileChange("banner", f)}
                placeholder="Geen banner"
              />
            </Section>

            <div className="pt-6">
              <div className="flex items-center justify-end">
                <div className="mr-3">
                  {showSuccess && (
                    <span className="text-sm text-green-600">
                      Wijzigingen opgeslagen
                    </span>
                  )}
                </div>
                {isEditing ? (
                  <FormSaveButton
                    enabled={isDirty}
                    loading={isSaving}
                    ariaLabel="Profiel opslaan"
                    onClick={handleSave}
                  />
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowCancelConfirm(false)}
          />
          <div className="z-10 w-full max-w-md rounded bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-semibold">
              Wijzigingen niet opgeslagen
            </h3>
            <p className="mb-4 text-sm text-foreground">
              Je hebt bewerkte gegevens die nog niet zijn opgeslagen. Weet je
              zeker dat je wilt annuleren?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="accent"
                onClick={() => setShowCancelConfirm(false)}
              >
                Terug
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setForm({ ...initialValues });
                  setValidationErrors({});
                  setIsEditing(false);
                  setShowCancelConfirm(false);
                }}
              >
                Annuleren
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default RouteComponent;
