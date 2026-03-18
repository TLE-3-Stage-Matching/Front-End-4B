import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useLoginForm } from "@/hooks/login.form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
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
import { toast } from "sonner";

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

  const mutation = useMutation({
    mutationFn: async (value: { email: string; password: string }) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ?? `${response.status} ${response.statusText}`,
        );
      }

      return data;
    },
    onSuccess: (data) => {
      useAuthStore.getState().login(data.data, data.token);
      toast.success("Ingelogd!");
      router.navigate({ to: redirectTo || "/", replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useLoginForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  return (
    <section className="m-auto flex h-svh items-center justify-center py-16">
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Vul je email in om in te loggen
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
                    autocomplete="password"
                  />
                )}
              />
            </FieldGroup>
          </form>
          <Button
            className="w-full"
            type="submit"
            form="login"
            disabled={mutation.isPending}
          >
            {mutation.isPending && <Spinner />}
            {mutation.isPending ? "Inloggen..." : "Login"}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
