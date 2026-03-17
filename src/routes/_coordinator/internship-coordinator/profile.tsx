import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AccountEdit, AccountSection } from "@/components/form/acount";

export const Route = createFileRoute(
  "/_coordinator/internship-coordinator/profile",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="mx-auto flex flex-col gap-8 p-8 lg:px-22">
      <h1 className="text-center">Coördinator profiel</h1>

      <Card className="min-h-60" id="personal-data">
        <CardHeader>
          <CardTitle asChild>
            <h2 className="text-xl">Persoonsgegevens</h2>
          </CardTitle>
          <CardAction>
            <AccountEdit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <AccountSection />
        </CardContent>
      </Card>
    </section>
  );
}
