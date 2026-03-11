import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/(auth)/logout")({
  beforeLoad: async () => {
    const { token, logout } = useAuthStore.getState();

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

    throw redirect({ to: "/login" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  redirect({ to: "/login" });
  return (
    <section className="flex items-center justify-center">
      <Spinner className="size-20" />
      <p>Loging Out..</p>
    </section>
  );
}
