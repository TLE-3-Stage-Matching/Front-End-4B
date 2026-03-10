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
import PolarChart from "@/routes/vacancies/-components/polar-chart.tsx";
import PolarChartSetup from "@/routes/vacancies/-components/polar-chart.tsx";

export const Route = createFileRoute("/vacancies/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = useParams({ from: "/vacancies/$id" });

  const data = {
    items: [
      {
        id: 1,
        company: "test",
        title: "Test vacature 1",
        hours_per_week: 40,
        requirements: [
          { id: 3, name: "Laravel" },
          { id: 4, name: "SQL" },
        ],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat auctor eros. Praesent fermentum lectus non nibh maximus varius. Aliquam quis felis nec eros egestas viverra quis sed purus. Vestibulum placerat tortor at quam consectetur, ac mollis libero facilisis. Cras at est ac diam euismod ultricies. In eget ipsum ac est rhoncus tincidunt ut ut odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        offer_text:
          "Aliquam quis felis nec eros egestas viverra quis sed purus. Vestibulum placerat tortor at quam consectetur, ac mollis libero facilisis. ",
        expectations_text:
          "Cras at est ac diam euismod ultricies. In eget ipsum ac est rhoncus tincidunt ut ut odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        matchscore: 50,
        favorite: false,
      },
      {
        id: 2,
        company: "test2",
        title: "Test vacature 2",
        hours_per_week: 36,
        requirements: [
          { id: 1, name: "React.js" },
          { id: 2, name: "Tailwind CSS" },
        ],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat auctor eros. Praesent fermentum lectus non nibh maximus varius. Aliquam quis felis nec eros egestas viverra quis sed purus. Vestibulum placerat tortor at quam consectetur, ac mollis libero facilisis. Cras at est ac diam euismod ultricies. In eget ipsum ac est rhoncus tincidunt ut ut odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        offer_text:
          "Aliquam quis felis nec eros egestas viverra quis sed purus. Vestibulum placerat tortor at quam consectetur, ac mollis libero facilisis. ",
        expectations_text:
          "Cras at est ac diam euismod ultricies. In eget ipsum ac est rhoncus tincidunt ut ut odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        matchscore: 60,
        favorite: true,
      },
    ],
  };

  // for if there is something in the backend:
  // const { data } = useQuery({
  //   queryKey: ["repoData"],
  //   queryFn: () =>
  //     fetch("https://back-end-main-2fian7.laravel.cloud/api/v1/vacancies").then(
  //       (res) => res.json(),
  //     ),
  // });

  return (
    <section className="flex flex-col gap-5 px-4 pt-2">
      <h1 className="mb-3 text-center text-5xl font-bold">
        {data.items[params.id - 1].title}
      </h1>

      <div className="grid h-full grid-cols-3 gap-2">
        <Card className="col-span-2 row-span-1 flex-col justify-between">
          <div className="flex">
            <section>
              <CardHeader>
                <div className="flex gap-2">
                  {/* if there is no image do this */}
                  <div
                    className="h-25 w-25 rounded-full bg-secondary text-center"
                    aria-label={`foto van ${data.items[params.id - 1].company} niet beschikbaar`}
                  >
                    {/* vacancy.company.name */}
                    <Image className="m-auto h-full w-2/3 text-background" />
                  </div>
                  {/* if there is an image do this */}
                  {/*<img className="h-25 w-25 rounded-full" src={vacancy.company.logo} alt="" />*/}
                  <div>
                    <h2 className="text-xl font-bold">
                      {data.items[params.id - 1].company}
                    </h2>
                    <div className="flex gap-1">
                      <Clock />
                      <p>
                        {data.items[params.id - 1].hours_per_week} uur per week
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm">
                  {data.items[params.id - 1].description}
                </p>
                <div className="flex gap-2 pt-2">
                  <div>
                    <h3 className="underline">Wat bieden wij?</h3>
                    <p className="text-sm">
                      {data.items[params.id - 1].offer_text}
                    </p>
                  </div>
                  <div>
                    <h3 className="underline">Wat verwachten wij van jouw?</h3>
                    <p className="text-sm">
                      {data.items[params.id - 1].expectations_text}
                    </p>
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
                {data.items[params.id - 1].requirements.map((tag) => (
                  <Badge variant="accent">{tag.name}</Badge>
                ))}
                {/* vacancy.vacancy_requirements */}
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
                <PolarChartSetup
                  vacancy={data.items[params.id - 1]}
                  key={data.items[params.id - 1].id}
                />
                <p className="font-bold">
                  Score: {data.items[params.id - 1].matchscore}%
                </p>
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
  );
}
