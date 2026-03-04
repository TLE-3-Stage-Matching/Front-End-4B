import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute(
  "/internship-coordinator/register-student-account",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [studentEmail, setStudentEmail] = useState("");

  const isEmailValid = useMemo(() => {
    const email = studentEmail.trim();
    if (email.length === 0) return false;
    if (email.includes(" ")) return false;

    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
  }, [studentEmail]);

  const canSave = isEmailValid;

  return (
    <section className="mx-auto flex min-h-[70vh] w-[80vw] max-w-3xl flex-col items-center py-16">
      <h1 className="mb-10 text-center text-5xl font-bold">
        Student toevoegen
      </h1>

      <div className="w-full max-w-md">
        <Card className="bg-white text-foreground">
          <CardHeader>
            <CardTitle>E-mailadres instellen</CardTitle>
            <CardDescription className="text-foreground">
              Vul het e-mailadres in van de student.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="space-y-2">
                <Label htmlFor="student-email">E-mailadres</Label>
                <Input
                  id="student-email"
                  type="email"
                  placeholder="E-mailadres"
                  className="!text-foreground placeholder:!text-foreground/60"
                  value={studentEmail}
                  onChange={(event) => setStudentEmail(event.target.value)}
                  aria-invalid={studentEmail.trim().length > 0 && !isEmailValid}
                />
              </div>
              <Button
                type="submit"
                disabled={!canSave}
                className="bg-chart-2 text-creme hover:bg-chart-2/90 disabled:pointer-events-auto"
              >
                Opslaan
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
