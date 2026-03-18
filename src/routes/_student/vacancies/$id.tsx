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
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

type VacancyRequirement = {
  tag: {
    name: string;
  };
};

type VacancyDetailQueryData = {
  data: {
    score: number;
    match_result: {
      subscores: {
        must_have: {
          score: number;
        };
        nice_to_have: {
          score: number;
        };
      };
    };
    vacancy: {
      vacancy_id: number;
      title: string;
      hours_per_week: number;
      description: string;
      offer_text: string;
      expectations_text: string;
      vacancy_requirements: VacancyRequirement[] | null;
      company: {
        name: string;
        email: string;
        location: string | null;
        photo_url: string | null;
      };
    };
  };
};

export const Route = createFileRoute("/_student/vacancies/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = useParams({ from: "/_student/vacancies/$id" });

  const { data, isLoading } = useQuery<VacancyDetailQueryData | null>({
    queryKey: [`/api/student/vacancies/${Number(params.id)}`],
  });

  const detailData = data?.data;

  useEffect(() => {
    if (!isLoading && detailData) {
      document.title = `StageLink - Informatie ${detailData.vacancy.title}`;
    }
  }, [detailData, isLoading]);

  if (isLoading) {
    return (
      <section className="flex h-full items-center justify-center">
        <Spinner className="size-15" />
      </section>
    );
  }
  if (!detailData) {
    return (
      <section className="flex h-full items-center justify-center">
        <p>Geen opdracht beschikbaar</p>;
      </section>
    );
  }
  return (
    <section className="flex h-[90%] flex-col gap-5 pt-2">
      <H1>{detailData.vacancy.title}</H1>

      <div className="grid h-full grid-cols-2 gap-2 lg:grid-cols-3">
        <Card className="col-span-2 row-span-1 h-full flex-col justify-between">
          <div className="flex flex-col md:flex-row">
            <section className="w-full">
              <CardHeader>
                <div className="flex gap-2 text-left">
                  {/* if there is no image do this */}
                  {detailData.vacancy.company.photo_url == null ? (
                    <div className="h-25 w-25 rounded-full bg-secondary text-center">
                      <Image
                        aria-label={`foto van ${detailData.vacancy.company.name} niet beschikbaar`}
                        className="m-auto h-full w-2/3 text-background"
                      />
                    </div>
                  ) : (
                    <img
                      className="h-25 w-25 rounded-full text-center"
                      src={detailData.vacancy.company.photo_url ?? undefined}
                      alt={`foto van ${detailData.vacancy.company.name}`}
                    />
                  )}
                  <div className="break-all">
                    <H2>{detailData.vacancy.company.name}</H2>
                    <div className="flex gap-1">
                      <Clock />
                      <p>{detailData.vacancy.hours_per_week} uur per week</p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p>{detailData.vacancy.description}</p>
                <div className="flex gap-2 pt-2">
                  <div className="flex-1">
                    <h3 className="underline">Wat bieden wij?</h3>
                    <p className="text-sm">{detailData.vacancy.offer_text}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="underline">Wat verwachten wij van jouw?</h3>
                    <p className="text-sm">
                      {detailData.vacancy.expectations_text}
                    </p>
                  </div>
                </div>
              </CardContent>
            </section>
            <section className="p-6 md:pr-6">
              <div className="flex gap-1">
                <MapPin />
                <p>{detailData.vacancy.company.location ?? "Locatie"}</p>
              </div>
              <div className="flex gap-1">
                <Map />
                <p>Afstand</p>
              </div>
              <div className="flex flex-col gap-2 pt-10">
                <p className="underline">Eisen:</p>
                {detailData.vacancy.vacancy_requirements ? (
                  detailData.vacancy.vacancy_requirements.map(
                    (tag: VacancyRequirement) => (
                      <Badge variant="accent">{tag.tag.name}</Badge>
                    ),
                  )
                ) : (
                  <p>Er zijn geen eisen</p>
                )}
              </div>
            </section>
          </div>

          <CardFooter>
            <Button asChild variant="accent">
              <a href={`mailto:${detailData.vacancy.company.email}`}>
                Neem contact op
              </a>
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
                  <PolarChartSetup
                    vacancy={detailData}
                    key={detailData.vacancy.vacancy_id}
                  />
                  <p className="font-bold">Score: {detailData.score}%</p>
                </div>
              </article>
              <article className="flex-1 text-center">
                <p className="font-bold">Legenda:</p>
                <div className="flex">
                  <Circle className="h-5 fill-[#FF6384]" />
                  <p>Belangrijke eisen</p>
                </div>
                <div className="flex">
                  <Circle className="h-5 fill-[#36A2EB]" />
                  <p>Overige eisen</p>
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
  );
}
