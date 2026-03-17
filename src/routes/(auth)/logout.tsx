import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";

export const Route = createFileRoute("/(auth)/logout")({
  component: RouteComponent,
});

function RouteComponent() {
  const { token, logout } = useAuthStore.getState();
  const navigate = useNavigate();

  useEffect(() => {
    async function doLogout() {
      if (token) {
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        } catch {
          // proceed with local logout even if the API call fails
        }
        logout();
      }
      navigate({ to: "/login" });
    }

    doLogout();
  }, []);

  return (
    <section className="my-auto flex h-svh flex-col items-center justify-center gap-6">
      <Spinner className="size-20" />
      <p>Logging Out..</p>
    </section>
  );
}
