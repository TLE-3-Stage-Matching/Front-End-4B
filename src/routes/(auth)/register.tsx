import { createFileRoute, redirect } from "@tanstack/react-router";
import { RegisterSchema } from "@/types/user";
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
import { useAuthStore } from "@/store/auth";
export const Route = createFileRoute("/(auth)/register")({
  beforeLoad: () => {
    const { token } = useAuthStore.getState();
    if (token) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const form = useRegisterForm({
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validators: {
      onSubmit: RegisterSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <section className="m-auto flex h-svh items-center justify-center py-16">
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle>Maak een account</CardTitle>
          <CardDescription>
            Vull je gegevens in om een stagecoördinator account aan te maken
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="py-3"
            id="register"
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
                      <field.InputField
                        label="Voornaam"
                        placeholder="voornaam"
                      />
                    )}
                  />
                </div>
                <div className="w-24">
                  <form.AppField
                    name="middle_name"
                    children={(field) => (
                      <field.InputField
                        label="Tussenvoegsel"
                        placeholder="van"
                      />
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
                    placeholder="email"
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
                    label="Bevestig Wachtwoord"
                    type="password"
                    autocomplete="new-password"
                    placeholder="bevestig wachtwoord"
                  />
                )}
              />
            </FieldGroup>
          </form>
          <Button type="submit" form="register" className="w-full">
            Account aanmaken
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
