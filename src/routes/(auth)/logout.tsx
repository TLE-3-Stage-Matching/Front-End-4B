import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";

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

    redirect({ to: "/login" });
  },
  component: () => null,
});
