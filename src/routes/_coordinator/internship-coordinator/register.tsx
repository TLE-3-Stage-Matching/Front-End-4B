import { createFileRoute } from "@tanstack/react-router";
import { StudentForm } from "./-components/student-form";
import { CompanyForm } from "./-components/company-form";
import { CompanyUserForm } from "./-components/company-user-form";

export const Route = createFileRoute(
  "/_coordinator/internship-coordinator/register",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="mx-auto flex flex-col gap-8 py-12 md:w-xl lg:w-4xl">
      <StudentForm />
      <CompanyForm />
      <CompanyUserForm />
    </section>
  );
}
