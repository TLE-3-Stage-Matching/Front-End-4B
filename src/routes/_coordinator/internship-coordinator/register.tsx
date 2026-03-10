import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiFetch } from "@/lib/queryClient";
import { RegisterSchema, RegisterCompanySchema, RegisterCompanyUserSchema } from "@/types/user";
import { useRegisterForm } from "@/hooks/register.form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute(
  "/_coordinator/internship-coordinator/register",
)({
  component: RouteComponent,
});

// --- Student form ---
function StudentForm() {
  const mutation = useMutation({
    mutationFn: (body: object) =>
      apiFetch("/api/coordinator/users", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      toast.success("Student aangemaakt");
      form.reset();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const form = useRegisterForm({
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validators: { onSubmit: RegisterSchema },
    onSubmit: async ({ value }) => {
      mutation.mutate({
        role: "student",
        first_name: value.first_name,
        middle_name: value.middle_name || undefined,
        last_name: value.last_name,
        email: value.email,
        password: value.password,
      });
    },
  });

  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle>Student registreren</CardTitle>
        <CardDescription>Maak een nieuw studentaccount aan</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="register-student"
          className="py-3"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <form.AppField
                  name="first_name"
                  children={(field) => (
                    <field.InputField label="Voornaam" placeholder="voornaam" />
                  )}
                />
              </div>
              <div className="w-24">
                <form.AppField
                  name="middle_name"
                  children={(field) => (
                    <field.InputField label="Tussenvoegsel" placeholder="van" />
                  )}
                />
              </div>
              <div className="flex-1">
                <form.AppField
                  name="last_name"
                  children={(field) => (
                    <field.InputField
                      label="Achternaam"
                      placeholder="achternaam"
                    />
                  )}
                />
              </div>
            </div>
            <form.AppField
              name="email"
              children={(field) => (
                <field.InputField
                  label="Email"
                  placeholder="email@voorbeeld.nl"
                  autocomplete="email"
                />
              )}
            />
            <form.AppField
              name="password"
              children={(field) => (
                <field.InputField
                  label="Wachtwoord"
                  type="password"
                  autocomplete="new-password"
                />
              )}
            />
            <form.AppField
              name="confirm_password"
              validators={{
                onChangeListenTo: ["password"],
                onChange: ({ value, fieldApi }) => {
                  if (value !== fieldApi.form.getFieldValue("password")) {
                    return { message: "Wachtwoorden komen niet overeen" };
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <field.InputField
                  label="Bevestig wachtwoord"
                  type="password"
                  autocomplete="new-password"
                  placeholder="bevestig wachtwoord"
                />
              )}
            />
          </FieldGroup>
        </form>
        <Button
          type="submit"
          form="register-student"
          className="mt-4 w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Aanmaken..." : "Student aanmaken"}
        </Button>
      </CardContent>
    </Card>
  );
}

// --- Company form ---
function CompanyForm() {
  const mutation = useMutation({
    mutationFn: (body: object) =>
      apiFetch("/api/coordinator/companies", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      toast.success("Bedrijf aangemaakt");
      form.reset();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const form = useRegisterForm({
    defaultValues: {
      name: "",
    },
    validators: { onSubmit: RegisterCompanySchema },
    onSubmit: async ({ value }) => {
      mutation.mutate({ name: value.name });
    },
  });

  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle>Bedrijf registreren</CardTitle>
        <CardDescription>Maak een nieuw bedrijf aan</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="register-company"
          className="py-3"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.AppField
              name="name"
              children={(field) => (
                <field.InputField
                  label="Bedrijfsnaam"
                  placeholder="Acme Corp"
                />
              )}
            />
          </FieldGroup>
        </form>
        <Button
          type="submit"
          form="register-company"
          className="mt-4 w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Aanmaken..." : "Bedrijf aanmaken"}
        </Button>
      </CardContent>
    </Card>
  );
}

// --- Company user form ---
function CompanyUserForm() {
  const { data: companiesData } = useQuery<{
    data: { id: number; name: string }[];
  }>({
    queryKey: ["/api/coordinator/companies"],
  });

  const companyOptions =
    companiesData?.data.map((c) => ({
      value: String(c.id),
      label: c.name,
    })) ?? [];

  const mutation = useMutation({
    mutationFn: (body: object) =>
      apiFetch("/api/coordinator/users", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      toast.success("Bedrijfsgebruiker aangemaakt");
      form.reset();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const form = useRegisterForm({
    defaultValues: {
      company_id: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validators: { onSubmit: RegisterCompanyUserSchema },
    onSubmit: async ({ value }) => {
      mutation.mutate({
        role: "company",
        company_id: Number(value.company_id),
        first_name: value.first_name,
        middle_name: value.middle_name || undefined,
        last_name: value.last_name,
        email: value.email,
        password: value.password,
      });
    },
  });

  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle>Bedrijfsgebruiker registreren</CardTitle>
        <CardDescription>
          Maak een account aan voor een medewerker van een bedrijf
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="register-company-user"
          className="py-3"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.AppField
              name="company_id"
              children={(field) => (
                <field.SelectField
                  label="Bedrijf"
                  placeholder="Selecteer bedrijf"
                  options={companyOptions}
                />
              )}
            />
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <form.AppField
                  name="first_name"
                  children={(field) => (
                    <field.InputField label="Voornaam" placeholder="voornaam" />
                  )}
                />
              </div>
              <div className="w-24">
                <form.AppField
                  name="middle_name"
                  children={(field) => (
                    <field.InputField label="Tussenvoegsel" placeholder="van" />
                  )}
                />
              </div>
              <div className="flex-1">
                <form.AppField
                  name="last_name"
                  children={(field) => (
                    <field.InputField
                      label="Achternaam"
                      placeholder="achternaam"
                    />
                  )}
                />
              </div>
            </div>
            <form.AppField
              name="email"
              children={(field) => (
                <field.InputField
                  label="Email"
                  placeholder="email@bedrijf.nl"
                  autocomplete="email"
                />
              )}
            />
            <form.AppField
              name="password"
              children={(field) => (
                <field.InputField
                  label="Wachtwoord"
                  type="password"
                  autocomplete="new-password"
                />
              )}
            />
            <form.AppField
              name="confirm_password"
              validators={{
                onChangeListenTo: ["password"],
                onChange: ({ value, fieldApi }) => {
                  if (value !== fieldApi.form.getFieldValue("password")) {
                    return { message: "Wachtwoorden komen niet overeen" };
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <field.InputField
                  label="Bevestig wachtwoord"
                  type="password"
                  autocomplete="new-password"
                  placeholder="bevestig wachtwoord"
                />
              )}
            />
          </FieldGroup>
        </form>
        <Button
          type="submit"
          form="register-company-user"
          className="mt-4 w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Aanmaken..." : "Gebruiker aanmaken"}
        </Button>
      </CardContent>
    </Card>
  );
}

// --- Page ---
function RouteComponent() {
  return (
    <section className="m-auto flex min-h-svh items-center justify-center py-16">
      <Tabs defaultValue="student" className="w-full max-w-lg">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="company">Bedrijf</TabsTrigger>
          <TabsTrigger value="company-user">Bedrijfsgebruiker</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <StudentForm />
        </TabsContent>
        <TabsContent value="company">
          <CompanyForm />
        </TabsContent>
        <TabsContent value="company-user">
          <CompanyUserForm />
        </TabsContent>
      </Tabs>
    </section>
  );
}
