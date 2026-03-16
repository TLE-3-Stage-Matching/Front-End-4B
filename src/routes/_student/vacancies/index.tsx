import { createFileRoute } from "@tanstack/react-router";
import VacancyCard from "@/routes/_student/vacancies/-components/vacancy-card.tsx";
import { useQuery } from "@tanstack/react-query";
import { H1 } from "@/components/ui/headings.tsx";

export const Route = createFileRoute("/_student/vacancies/")({
  component: RouteComponent,
});

async function RouteComponent() {
  // const [data, setData] = useState(null);
  const { data, status, error } = useQuery({
    queryKey: ["Vacancies"],
    queryFn: async () =>
      await fetch("/api/vacancies").then((res) => res.json()),
  });

  if (status === "pending") {
    return <span>Aan het laden...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  return (
    <section className="flex flex-col gap-5 px-4 pt-2">
      <H1>Aanbevolen stageopdrachten</H1>

      {data === null ? (
        <p>Aan het laden...</p>
      ) : data?.data?.length ? (
        data.data?.map((vacancy) => (
          <VacancyCard vacancy={vacancy} key={vacancy.id} />
        ))
      ) : (
        <p>Geen opdrachten beschikbaar</p>
      )}
    </section>
  );
}
