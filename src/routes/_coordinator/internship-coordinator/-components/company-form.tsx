import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiFetch } from "@/lib/queryClient";
import { RegisterCompanySchema } from "@/types/user";
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

export function CompanyForm() {
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
    <Card>
      <CardHeader>
        <CardTitle asChild>
          <h2>Bedrijf registreren</h2>
        </CardTitle>
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
          {mutation.isPending && <Spinner />}
          {mutation.isPending ? "Aanmaken..." : "Bedrijf aanmaken"}
        </Button>
      </CardContent>
    </Card>
  );
}
