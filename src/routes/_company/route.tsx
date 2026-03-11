import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";

export const Route = createFileRoute("/_company")({
  beforeLoad: ({ location }) => {
    const { token, user } = useAuthStore.getState();
    if (!token) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
    if (user?.role !== "company") {
      throw redirect({ to: "/" });
    }
  },
  component: () => <Outlet />,
});
