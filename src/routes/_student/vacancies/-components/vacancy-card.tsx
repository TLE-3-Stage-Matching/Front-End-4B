import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Image } from "lucide-react";
import DoughnutChart from "@/routes/_student/vacancies/-components/doughnut-chart.tsx";
import type { Vacancy } from "@/types/vacancy.ts";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReadMore from "@/routes/_student/vacancies/-components/read-more.tsx";
import ai from "/public/images/ai.svg";

function VacancyCard({ vacancy }: { vacancy: Vacancy }) {
  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(vacancy.favorite);
  const textRef = useRef(null);
  const toggleMore = () => {
    setOpen(!open);
    textRef.current?.focus();
  };

  // this is so you can toggle the favorite sort of
  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  useEffect(() => {
    setFavorite(favorite);
  });

  return (
    <Card aria-label={`Stage opdracht: ${vacancy.title}`}>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle asChild>
            <h2>{vacancy.title}</h2>
          </CardTitle>
          {/* shows the heart filled or not depending on if its favorited or not */}
          {favorite ? (
            <button aria-label="favoriete toegevoegt" onClick={toggleFavorite}>
              <Heart
                name={"favoriete"}
                className="fill-primary text-primary"
                strokeWidth="3"
              />
            </button>
          ) : (
            <button aria-label="favoriete toevoegen" onClick={toggleFavorite}>
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
            <div className="text-center">
              {/* if there is no image do this */}
              <div className="m-auto h-25 w-25 rounded-full bg-secondary text-center">
                <Image
                  aria-label={`foto van ${vacancy.company.name} niet beschikbaar`}
                  className="m-auto h-full w-2/3 text-background"
                />
              </div>
              {/* if there is an image do this */}
              {/*<img className="h-25 w-25 rounded-full" src={vacancy.company.logo} alt="" />*/}
              <p>{vacancy.company.name}</p>
            </div>
            <div>
              {open ? (
                <p ref={textRef} tabIndex={-1} id={`desc-${vacancy.id}`}>
                  {vacancy.description + " "}
                  <ReadMore id={vacancy.id} f={toggleMore}>
                    minder
                  </ReadMore>
                </p>
              ) : (
                <p ref={textRef} tabIndex={-1} id={`desc-${vacancy.id}`}>
                  {vacancy.description.slice(0, 250)}
                  <span>... </span>
                  <ReadMore id={vacancy.id} f={toggleMore}>
                    meer
                  </ReadMore>
                </p>
              )}
              <div className="flex gap-2 pt-2">
                {vacancy.vacancy_requirements ? (
                  vacancy.vacancy_requirements.map((tag) => (
                    <Badge variant="accent">{tag.name}</Badge>
                  ))
                ) : (
                  <p>Er zijn geen tags</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <img
              src={ai}
              alt="ai gebruik"
              className="relative -top-4 left-35 h-6 fill-accent"
            />
            <DoughnutChart vacancy={vacancy} key={vacancy.id} />
          </div>
        </div>

        <div className="text-right">
          <Button asChild>
            <Link to={"/vacancies/$id"} params={{ id: vacancy.id }}>
              Bekijk opdracht
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default VacancyCard;
