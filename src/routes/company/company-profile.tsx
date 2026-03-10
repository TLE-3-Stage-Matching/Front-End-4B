import { useEffect, useMemo, useRef, useState } from "react";
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

export const Route = createFileRoute("/company/company-profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const initialValues = useMemo(
    () => ({
      // Dummy data
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
  const editButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showAllErrors, setShowAllErrors] = useState(false);

  function setFieldValue<K extends keyof typeof form>(key: K, value: any) {
    setForm((s) => ({ ...s, [key]: value }));
    // Track touched state so realtime validation shows errors only after the user interacted with a field.
    setTouched((t) => ({ ...t, [String(key)]: true }));
  }

  useEffect(() => {
    document.title = "Bedrijfsprofiel - StageLink";
    setForm({ ...initialValues });
  }, [initialValues]);

  const isDirty = useMemo(() => {
    // Consider text fields and file inputs when determining dirty state.
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

  // Create temporary object URLs for locally selected files so the browser can preview them. These must be revoked to avoid memory leaks.
  const logoUrl = useMemo(
    () => (form.logo ? URL.createObjectURL(form.logo) : undefined),
    [form.logo],
  );
  const bannerUrl = useMemo(
    () => (form.banner ? URL.createObjectURL(form.banner) : undefined),
    [form.banner],
  );

  // Revoke object URLs on unmount or when the URL changes.
  useEffect(() => {
    return () => {
      if (logoUrl) URL.revokeObjectURL(logoUrl);
      if (bannerUrl) URL.revokeObjectURL(bannerUrl);
    };
  }, [logoUrl, bannerUrl]);

  // Handle file selection from the hidden file inputs.
  // - Performs client-side validation (type + size) and sets per-field validationErrors to provide immediate feedback.
  // - Revokes previously created object URLs to avoid memory leaks.
  function handleFileChange(key: "logo" | "banner", file?: File) {
    const MAX_BYTES = 5 * 1024 * 1024; // 5MB, why would logos ever be larger than this?
    if (file) {
      if (!file.type.startsWith("image/")) {
        setValidationErrors((v) => ({
          ...v,
          [key]: "Bestand moet een afbeelding zijn.",
        }));
        return;
      }
      if (file.size > MAX_BYTES) {
        setValidationErrors((v) => ({
          ...v,
          [key]: "Afbeelding is te groot (max 5MB).",
        }));
        return;
      }
    } else {
      // clearing file input
      setValidationErrors((v) => {
        const copy = { ...v };
        delete copy[key];
        return copy;
      });
    }

    // revoke previous objectURL to avoid leaks before replacing
    try {
      if (key === "logo" && logoUrl) URL.revokeObjectURL(logoUrl);
      if (key === "banner" && bannerUrl) URL.revokeObjectURL(bannerUrl);
    } catch (e) {
      // ignore
    }

    setForm((s) => ({ ...s, [key]: file }));

    // clear any previous file validation error on successful set
    if (file) {
      setValidationErrors((v) => {
        const copy = { ...v };
        delete copy[key];
        return copy;
      });
    }
  }

  // - Validates the thing using Zod.
  // - On validation failure we focus+scroll to the first invalid field to assist keyboard and screen-reader users.
  function handleSave() {
    const result = CompanyProfileSchema.safeParse(form as any);
    if (!result.success) {
      const map: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path?.[0] ?? "");
        if (key) map[key] = issue.message;
      }
      setValidationErrors(map);
      setShowAllErrors(true);

      setTimeout(() => {
        // focus + scroll the first invalid field for easier keyboard navigation
        const firstKey = Object.keys(map)[0];
        if (!firstKey) return;
        const el = document.getElementById(firstKey) as HTMLElement | null;
        if (el && typeof el.focus === "function") {
          el.focus();
          try {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          } catch (e) {
            /* ignore */
          }
        } else {
          const byName = document.querySelector(
            `[name="${firstKey}"]`,
          ) as HTMLElement | null;
          if (byName && typeof byName.focus === "function") {
            byName.focus();
            try {
              byName.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch (e) {
              /* ignore */
            }
          }
        }
      });
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

  // While editing we run zod on the full form and only expose errors for fields that were touched (unless the user already attempted to save, then `showAllErrors` will reveal them).
  useEffect(() => {
    if (!isEditing) return;
    const result = CompanyProfileSchema.safeParse(form as any);
    if (result.success) {
      setValidationErrors({});
      return;
    }
    const map: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path?.[0] ?? "");
      if (!key) continue;
      if (showAllErrors || touched[key]) map[key] = issue.message;
    }
    setValidationErrors(map);
  }, [form, touched, isEditing, showAllErrors]);

  // Modal focus management: trap focus and handle Escape while modal open.
  useEffect(() => {
    if (!showCancelConfirm || !modalRef.current) return;
    const modal = modalRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusable = Array.from(
      modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute("disabled"));

    const first = focusable[0] as HTMLElement | undefined;
    const last = focusable[focusable.length - 1] as HTMLElement | undefined;
    if (first) first.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowCancelConfirm(false);
        return;
      }
      if (e.key === "Tab") {
        if (!first || !last) return;
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // restore focus to the edit button if present, otherwise the
      // previously focused element.
      if (editButtonRef.current) editButtonRef.current.focus();
      else if (previouslyFocused) previouslyFocused.focus();
    };
  }, [showCancelConfirm]);

  return (
    <main
      className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center px-2 py-16 sm:px-0"
      role="main"
    >
      <h1 className="mb-10 text-center text-5xl font-bold">Bedrijfsprofiel</h1>

      <div className="w-full max-w-3xl">
        <Card className="bg-white text-foreground">
          {/* Header contains title/description and the edit toggle button.
              The toggle will open edit mode or ask for confirmation when
              there are unsaved changes. */}
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
                  ref={editButtonRef}
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
            {/* Short alert shown when the form has errors.
                Per-field messages provide detail and are linked with
                aria-describedby/aria-invalid. */}
            {Object.keys(validationErrors).length > 0 && (
              <div
                role="alert"
                aria-live="assertive"
                className="mb-4 rounded bg-destructive/10 p-3 text-sm text-destructive"
              >
                Er zijn fouten in het formulier. Controleer de aangegeven
                velden.
              </div>
            )}
            <Section title="Identiteit" id="section-identiteit">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex items-center justify-center md:col-span-1">
                  <FilePreview
                    label="Logo"
                    src={logoUrl}
                    alt={`${form.name} logo`}
                    isEditing={isEditing}
                    onFile={(f) => handleFileChange("logo", f)}
                    placeholder="Geen logo"
                    error={validationErrors.logo}
                    errorId="logo-error"
                  />
                </div>

                <div className="md:col-span-2">
                  <FieldGroup>
                    <FieldDisplay
                      label="Bedrijfsnaam"
                      isEditing={isEditing}
                      id="name"
                    >
                      {isEditing ? (
                        <>
                          <Input
                            id="name"
                            value={form.name}
                            onChange={(e) =>
                              setFieldValue("name", e.target.value)
                            }
                            aria-invalid={!!validationErrors.name}
                            aria-describedby={
                              validationErrors.name ? "name-error" : undefined
                            }
                          />
                          {validationErrors.name && (
                            <div
                              id="name-error"
                              className="mt-1 text-sm text-destructive"
                            >
                              {validationErrors.name}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="py-2">{form.name}</div>
                      )}
                    </FieldDisplay>
                    <FieldDisplay
                      label="E-mailadres"
                      isEditing={isEditing}
                      id="email"
                    >
                      {isEditing ? (
                        <>
                          <Input
                            id="email"
                            value={form.email}
                            onChange={(e) =>
                              setFieldValue("email", e.target.value)
                            }
                            aria-invalid={!!validationErrors.email}
                            aria-describedby={
                              validationErrors.email ? "email-error" : undefined
                            }
                          />
                          {validationErrors.email && (
                            <div
                              id="email-error"
                              className="mt-1 text-sm text-destructive"
                            >
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

            <Section title="Contact & adres" id="section-contact">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  {isEditing ? (
                    <>
                      <EditableField
                        label="Adres"
                        value={form.address}
                        onChange={(v) => setFieldValue("address", v)}
                        id="address"
                        isEditing={isEditing}
                        error={validationErrors.address}
                        errorId="address-error"
                      />
                      {validationErrors.address && (
                        <div
                          id="address-error"
                          className="mt-1 text-sm text-destructive"
                        >
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
                        onChange={(v) => setFieldValue("industry", v)}
                        id="industry"
                        isEditing={isEditing}
                        error={validationErrors.industry}
                        errorId="industry-error"
                      />
                      {validationErrors.industry && (
                        <div
                          id="industry-error"
                          className="mt-1 text-sm text-destructive"
                        >
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
                        onChange={(v) => setFieldValue("phone", v)}
                        id="phone"
                        isEditing={isEditing}
                        error={validationErrors.phone}
                        errorId="phone-error"
                      />
                      {validationErrors.phone && (
                        <div
                          id="phone-error"
                          className="mt-1 text-sm text-destructive"
                        >
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
                        onChange={(v) => setFieldValue("size", v)}
                        id="size"
                        as="select"
                        isEditing={isEditing}
                        error={validationErrors.size}
                        errorId="size-error"
                      />
                      {validationErrors.size && (
                        <div
                          id="size-error"
                          className="mt-1 text-sm text-destructive"
                        >
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

            <Section title="Extra informatie" id="section-extra">
              {isEditing ? (
                <>
                  <EditableField
                    label="Extra informatie"
                    value={form.extra}
                    onChange={(v) => setFieldValue("extra", v)}
                    id="extra"
                    as="textarea"
                    isEditing={isEditing}
                    error={validationErrors.extra}
                    errorId="extra-error"
                  />
                  {validationErrors.extra && (
                    <div
                      id="extra-error"
                      className="mt-1 text-sm text-destructive"
                    >
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

            <Section className="border-b-0" title="Media" id="section-media">
              <div className="md:col-span-2">
                <FilePreview
                  label="Banner"
                  src={bannerUrl}
                  alt={`${form.name} banner`}
                  isEditing={isEditing}
                  onFile={(f) => handleFileChange("banner", f)}
                  placeholder="Geen banner"
                  error={validationErrors.banner}
                  errorId="banner-error"
                />
                {validationErrors.banner && (
                  <div
                    id="banner-error"
                    className="mt-1 text-sm text-destructive"
                  >
                    {validationErrors.banner}
                  </div>
                )}
              </div>
            </Section>

            <div className="pt-6">
              <div className="flex items-center justify-end">
                <div className="mr-3">
                  {showSuccess && (
                    <span role="status" className="text-sm text-green-600">
                      Wijzigingen opgeslagen
                    </span>
                  )}
                </div>
                {/* Enable the save button when there are local changes. Uses
                    handleSave which validates client-side and simulates
                    a server save.
                    Literally doesn't work at the moment. It isn't a big deal,
                    so I'm fixing it when I have nothing better to do. */}
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
      {/* Confirmation modal when cancelling with unsaved changes. */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowCancelConfirm(false)}
          />
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-dialog-title"
            className="z-10 w-full max-w-md rounded bg-white p-6 shadow-lg"
          >
            <h3 id="cancel-dialog-title" className="mb-2 text-lg font-semibold">
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
    </main>
  );
}

export default RouteComponent;
