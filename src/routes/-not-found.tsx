import { Route as rootRoute } from "./__root";
import { NotFoundRoute } from "@tanstack/react-router";

export const Route = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFound,
});

function NotFound() {
  return (
    <section className="flex h-svh flex-col items-center justify-center gap-4">
      <h1 className="text-4xl text-primary">404</h1>
      <p className="text-2xl">Not Found</p>
    </section>
  );
}
