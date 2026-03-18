import { Route as rootRoute } from "./__root";
import { NotFoundRoute } from "@tanstack/react-router";

export const Route = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFound,
});

function NotFound() {
  return (
    <div>
      <p>Not Found</p>
    </div>
  );
}
