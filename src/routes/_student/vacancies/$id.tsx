import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { Clock, Image, MapPin, Map, Circle } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import PolarChartSetup from "@/routes/_student/vacancies/-components/polar-chart.tsx";
import { useEffect } from "react";
import { H1, H2 } from "@/components/ui/headings.tsx";
import AiUse from "@/routes/_student/vacancies/-components/ai-use.tsx";

export const Route = createFileRoute("/_student/vacancies/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = useParams({ from: "/_student/vacancies/$id" });

  // const { data, status, error } = useQuery({
  //   queryKey: [`/api/student/vacancies/${params.id}/detail`],
  // });

  if (status === "pending") {
    return <p>Aan het laden...</p>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  useEffect(() => {
    if (data !== null) {
      document.title = `StageLink - Informatie ${data.title}`;
    }
  }, [data]);

  return data === null ? (
    <p>Aan het laden...</p>
  ) : data ? (
    <section className="flex h-[90%] flex-col gap-5 px-4 pt-2">
      <H1>{data.title}</H1>

      <div className="grid h-full grid-cols-2 gap-2 lg:grid-cols-3">
        <Card className="col-span-2 row-span-1 h-full flex-col justify-between">
          <div className="flex flex-col md:flex-row">
            <section className="w-full">
              <CardHeader>
                <div className="flex gap-2">
                  {/* if there is no image do this */}
                  {data.company.photo_url == null ? (
                    <div className="h-25 w-25 rounded-full bg-secondary text-center">
                      <Image
                        aria-label={`foto van ${data.company.name} niet beschikbaar`}
                        className="m-auto h-full w-2/3 text-background"
                      />
                    </div>
                  ) : (
                    <img
                      className="m-auto h-25 w-25 rounded-full text-center"
                      src={data.company.photo_url}
                      alt={`foto van ${data.company.name}`}
                    />
                  )}
                  <div className="break-all">
                    <H2>{data.company.name}</H2>
                    <div className="flex gap-1">
                      <Clock />
                      <p>{data.hours_per_week} uur per week</p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p>{data.description}</p>
                <div className="flex gap-2 pt-2">
                  <div className="flex-1">
                    <h3 className="underline">Wat bieden wij?</h3>
                    <p className="text-sm">{data.offer_text}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="underline">Wat verwachten wij van jouw?</h3>
                    <p className="text-sm">{data.expectations_text}</p>
                  </div>
                </div>
              </CardContent>
            </section>
            <section className="p-6 md:pr-6">
              <div className="flex gap-1">
                <MapPin />
                <p>Locatie</p>
              </div>
              <div className="flex gap-1">
                <Map />
                <p>Afstand</p>
              </div>
              <div className="flex flex-col gap-2 pt-10">
                <p className="underline">Eisen:</p>
                {data.vacancy_requirements ? (
                  data.vacancy_requirements.map((tag) => (
                    <Badge variant="accent">{tag.name}</Badge>
                  ))
                ) : (
                  <p>Er zijn geen eisen</p>
                )}
              </div>
            </section>
          </div>

          <CardFooter>
            <Button asChild variant="accent">
              <Link to={"/"}>Neem contact op</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card
          variant="secondary"
          className="col-span-2 row-span-1 flex-col justify-between lg:col-span-1"
        >
          <CardContent className="py-2">
            <h2 className="text-center text-xl font-bold">Matchscore:</h2>
            <div className="flex flex-col gap-2 md:flex-row lg:flex-col">
              <article className="flex-1">
                <div className="text-center">
                  <AiUse
                    style={
                      "relative left-[35vw] lg:left-[17vw] h-8 fill-accent hover:fill-dark-teal"
                    }
                  />
                  <Button asChild className="sr-only">
                    <Link to={"/"}>Meer informatie</Link>
                  </Button>
                  <PolarChartSetup vacancy={data} key={data.id} />
                  <p className="font-bold">Score: {60}%</p>
                </div>
              </article>
              <article className="flex-1 text-center">
                <p className="font-bold">Legenda:</p>
                <div className="flex">
                  <Circle className="h-5 fill-[#FF6384]" />
                  <p>Eisen</p>
                </div>
                <div className="flex">
                  <Circle className="h-5 fill-[#FFCE56]" />
                  <p>Opleiding</p>
                </div>
              </article>
            </div>
          </CardContent>

          <CardFooter className="col-span-2 text-center">
            <div className="w-full">
              <Button asChild variant="tertiary">
                <Link to={"/"}>Meer informatie</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  ) : (
    <p>Geen opdracht beschikbaar</p>
  );
}
