import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useLoginForm } from "@/hooks/user.form";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { LoginSchema } from "@/types/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/auth";
import { z } from "zod";

export const Route = createFileRoute("/(auth)/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: () => {
    const { token } = useAuthStore.getState();
    if (token) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { redirect: redirectTo } = Route.useSearch();
  const router = useRouter();

  const form = useLoginForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await fetch("api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      useAuthStore.getState().login(data.data, data.token);
      router.navigate({ to: redirectTo || "/", replace: true });
    },
  });

  return (
    <section className="m-auto flex h-svh items-center justify-center py-16">
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="py-3"
            id="login"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.AppField
                name="email"
                children={(field) => <field.EmailField label="Email" />}
              />
              <form.AppField
                name="password"
                children={(field) => <field.PasswordField label="Wachtwoord" />}
              />
            </FieldGroup>
          </form>
          <Button type="submit" form="login">
            login
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
