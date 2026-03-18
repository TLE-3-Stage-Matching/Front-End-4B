import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import CompanyCard from "@/routes/_coordinator/internship-coordinator/-components/company-card.tsx";

export const Route = createFileRoute(
  "/_coordinator/internship-coordinator/companies",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/coordinator/companies"],
  });

  const companies = data;

  return (
    <>
      <h1>Bedrijven overzicht</h1>

      <div className="flex flex-col gap-1 pb-3">
        {companies != null && companies?.data?.length > 0 ? (
          companies.data.map((company) => <CompanyCard company={company} />)
        ) : (
          <p>geen studenten</p>
        )}
      </div>
    </>
  );
}
