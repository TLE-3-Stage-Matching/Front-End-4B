import { createFileRoute } from "@tanstack/react-router";
import VacancyCard from "@/routes/_student/vacancies/-components/vacancy-card.tsx";
import { useQuery } from "@tanstack/react-query";
import { H1 } from "@/components/ui/headings.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export const Route = createFileRoute("/_student/vacancies/")({
  component: RouteComponent,
});

function RouteComponent() {
  // const [data, setData] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["/api/student/vacancies/with-scores"],
  });

  if (isLoading) {
    return (
      <div>
        <H1>Aanbevolen stageopdrachten</H1>
        <Card>
          <CardContent className="flex flex-col gap-10">
            <Skeleton className="h-5 w-50" />
            <div className="flex justify-between gap-6">
              <div className="flex gap-6">
                <div className="flex flex-col gap-2 text-center">
                  <Skeleton className="h-25 w-25 rounded-full" />
                  <Skeleton className="h-5 w-25" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-100" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-15" />
                    <Skeleton className="h-5 w-15" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-center">
                <Skeleton className="h-5 w-30" />
                <Skeleton className="h-30 w-30 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-5 pt-2">
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
