import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AccountEdit, AccountSection } from "@/components/form/acount";
import { H1, H2 } from "@/components/ui/headings.tsx";

export const Route = createFileRoute("/_company/company/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex flex-col gap-6">
      <H1>Werknemer profiel</H1>

      <Card className="min-h-60" id="personal-data">
        <CardHeader>
          <CardTitle asChild>
            <H2>Persoonsgegevens</H2>
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
