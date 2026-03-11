import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";

export const Route = createFileRoute("/_student")({
  beforeLoad: ({ location }) => {
    const { token, user } = useAuthStore.getState();
    if (!token) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
    if (user?.role !== "student") {
      throw redirect({ to: "/" });
    }
  },

  component: () => <Outlet />,
});
