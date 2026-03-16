import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Clock, Image, MapPin, Map } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import PolarChart from "@/routes/_student/vacancies/-components/polar-chart.tsx";
import PolarChartSetup from "@/routes/_student/vacancies/-components/polar-chart.tsx";
import { useEffect, useState } from "react";
import { H1, H2 } from "@/components/ui/headings.tsx";
import AiUse from "@/routes/_student/vacancies/-components/ai-use.tsx";

export const Route = createFileRoute("/_student/vacancies/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = useParams({ from: "/_student/vacancies/$id" });

  const [data, setData] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      const response = await fetch(`/api/vacancies`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      //scuffed solution for details because there is no route in back-end
      if (response.ok) {
        const details = await response.json();
        console.log(details.data);
        const vacancy = details.data.find(
          (detail) => detail.id === Number(params.id),
        );
        setData(details.data[0]);
        console.log(data);
      }
    };

    getDetails();
  }, [params.id]);

  return data === null ? (
    <p>Aan het laden...</p>
  ) : data ? (
    <section className="flex h-[90vh] flex-col gap-5 px-4 pt-2">
      <H1>{data.title}</H1>

      <div className="grid h-full grid-cols-3 gap-2">
        <Card className="col-span-2 row-span-1 h-full flex-col justify-between">
          <div className="flex">
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
                  <div>
                    <h3 className="underline">Wat bieden wij?</h3>
                    <p className="text-sm">{data.offer_text}</p>
                  </div>
                  <div>
                    <h3 className="underline">Wat verwachten wij van jouw?</h3>
                    <p className="text-sm">{data.expectations_text}</p>
                  </div>
                </div>
              </CardContent>
            </section>
            <section className="pr-6">
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
                  <p>Er zijn geen tags</p>
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
          className="col-span-1 row-span-1 flex-col justify-between"
        >
          <div>
            <CardHeader>
              <h2 className="text-center text-xl font-bold">Matchscore:</h2>
            </CardHeader>

            <CardContent className="py-2">
              <div className="w-full text-center">
                <AiUse />
                <PolarChartSetup vacancy={data} key={data.id} />
                <p className="font-bold">Score: {60}%</p>
              </div>
            </CardContent>
          </div>

          <CardFooter className="text-center">
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
