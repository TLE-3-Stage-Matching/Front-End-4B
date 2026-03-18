import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Image } from "lucide-react";
import DoughnutChart from "@/routes/_student/vacancies/-components/doughnut-chart.tsx";
import type { Vacancy } from "@/types/vacancy.ts";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReadMore from "@/routes/_student/vacancies/-components/read-more.tsx";
import { H2 } from "@/components/ui/headings.tsx";
import AiUse from "@/routes/_student/vacancies/-components/ai-use.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Prefrences } from "@/types/user-profile.ts";
import { apiFetch, queryClient } from "@/lib/query-client.ts";
import { toast } from "sonner";

function VacancyCard({ vacancy }: { vacancy: Vacancy }) {
  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const textRef = useRef(null);
  const toggleMore = () => {
    setOpen(!open);
    textRef.current?.focus();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["api/student/saved-vacancies"],
  });
  // console.log(data);

  useEffect(() => {
    if (!isLoading && data?.data && data?.data != []) {
      for (let item of data?.data) {
        if (item.vacancy_id === vacancy.vacancy_id) {
          setFavorite(true);
        }
      }
    }
  }, [data, isLoading, vacancy.vacancy_id]);

  const addFavorite = useMutation({
    mutationFn: (value) =>
      apiFetch(`/api/student/saved-vacancies`, {
        method: "POST",
        body: JSON.stringify({
          vacancy_id: value,
        }),
      }),
    onSuccess: () => {
      toast.success("Aan favoriete toegevoegt");
      setFavorite(true);
      queryClient.invalidateQueries({
        queryKey: ["/api/student/saved-vacancies/"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteFavorite = useMutation({
    mutationFn: (value) =>
      apiFetch(`/api/student/saved-vacancies/${value}`, {
        method: "DELETE",
        body: JSON.stringify({
          vacancy_id: vacancy.id,
        }),
      }),
    onSuccess: () => {
      toast.success("Uit favoriete verwijderd");
      setFavorite(false);
      queryClient.invalidateQueries({
        queryKey: [`/api/student/saved-vacancies/${value}`],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  useEffect(() => {
    document.title = "StageLink - Aanbevolen stageopdrachten";
  }, []);

  console.log(vacancy);

  return (
    <Card aria-label={`Stage opdracht: ${vacancy.title}`}>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle asChild>
            <H2>{vacancy.title}</H2>
          </CardTitle>
          {/* shows the heart filled or not depending on if its favorited or not */}
          {favorite ? (
            <button
              aria-label="favoriete toegevoegt"
              onClick={() => deleteFavorite.mutate(vacancy.vacancy_id)}
            >
              <Heart
                name={"favoriete"}
                className="fill-primary text-primary"
                strokeWidth="3"
              />
            </button>
          ) : (
            <button
              aria-label="favoriete toevoegen"
              onClick={() => addFavorite.mutate(vacancy.vacancy_id)}
            >
              <Heart
                name={"favoriete"}
                className="text-dark-teal"
                strokeWidth="3"
              />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex justify-between gap-4">
          <div className="flex gap-4">
            <div className="max-w-3/5 text-center">
              {!vacancy.company?.photo_url ||
              vacancy.company?.photo_url == null ? (
                <div className="m-auto h-25 w-25 rounded-full bg-secondary text-center">
                  <Image
                    aria-label={`foto van ${vacancy.company.name} niet beschikbaar`}
                    className="m-auto h-full w-2/3 text-background"
                  />
                </div>
              ) : (
                <img
                  className="m-auto h-25 w-25 rounded-full text-center"
                  src={vacancy.company?.photo_url}
                  alt={`foto van ${vacancy.company}`}
                />
              )}
              <p className="break-all">{vacancy.company}</p>
            </div>
            <div>
              {open ? (
                <p ref={textRef} tabIndex={-1} id={`desc-${vacancy.id}`}>
                  {vacancy.description ?? "" + " "}
                  <ReadMore id={vacancy.id} f={toggleMore}>
                    minder
                  </ReadMore>
                </p>
              ) : (
                <p ref={textRef} tabIndex={-1} id={`desc-${vacancy.id}`}>
                  {vacancy.description?.slice(0, 250) ?? ""}
                  <span>... </span>
                  <ReadMore id={vacancy.id} f={toggleMore}>
                    meer
                  </ReadMore>
                </p>
              )}
              <div className="flex flex-wrap gap-2 pt-2">
                {vacancy.tags ? (
                  vacancy.tags
                    .slice(0, 5)
                    .map((tag) => <Badge variant="accent">{tag.name}</Badge>)
                ) : (
                  <p>Er zijn geen tags</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <AiUse
              style={
                "relative -top-4 left-35 h-6 fill-accent hover:fill-dark-teal"
              }
            />
            <Button asChild className="sr-only">
              <Link to={"/"}>Meer informatie</Link>
            </Button>
            <DoughnutChart vacancy={vacancy} key={vacancy.vacancy_id} />
          </div>
        </div>

        <div className="text-right">
          <Button asChild>
            <Link
              to={"/vacancies/$id"}
              params={{ id: vacancy.vacancy_id.toString() }}
            >
              Bekijk opdracht
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default VacancyCard;
