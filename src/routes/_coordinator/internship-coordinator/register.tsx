import { createFileRoute } from "@tanstack/react-router";
import { StudentForm } from "./-components/student-form";
import { CompanyForm } from "./-components/company-form";
import { CompanyUserForm } from "./-components/company-user-form";
import { H1 } from "@/components/ui/headings.tsx";

export const Route = createFileRoute(
  "/_coordinator/internship-coordinator/register",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="mx-auto flex flex-col gap-6">
      <H1>Gebruiker aanmaken</H1>
      <StudentForm />
      <CompanyForm />
      <CompanyUserForm />
    </section>
  );
}
