import { createFileRoute } from "@tanstack/react-router";
import VacancyCard from "@/routes/_student/vacancies/-components/vacancy-card.tsx";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_student/vacancies/")({
  component: RouteComponent,
});

async function RouteComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getVacancies = async () => {
      const response = await fetch("/api/vacancies", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setData(await response.json());
      }
    };

    getVacancies();
  }, []);

  return (
    <section className="flex flex-col gap-5 px-4 pt-2">
      <h1 className="text-center">Aanbevolen stageopdrachten</h1>

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
