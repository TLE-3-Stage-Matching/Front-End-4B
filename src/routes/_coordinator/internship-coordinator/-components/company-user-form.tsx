import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiFetch } from "@/lib/queryClient";
import { RegisterCompanyUserSchema } from "@/types/user";
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
import { Spinner } from "@/components/ui/spinner";

export function CompanyUserForm() {
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
    <Card>
      <CardHeader>
        <CardTitle asChild>
          <h2>Bedrijfsgebruiker registreren</h2>
        </CardTitle>
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
                  autocomplete="confirm_password"
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
          {mutation.isPending && <Spinner />}
          {mutation.isPending ? "Aanmaken..." : "Gebruiker aanmaken"}
        </Button>
      </CardContent>
    </Card>
  );
}
