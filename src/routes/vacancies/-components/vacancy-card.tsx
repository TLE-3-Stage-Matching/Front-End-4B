import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Image } from "lucide-react";
import DoughnutChart from "@/routes/vacancies/-components/doughnut-chart.tsx";
import type { Vacancy } from "@/types/vacancy.ts";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "@tanstack/react-router";

function VacancyCard({ vacancy }: { vacancy: Vacancy }) {
  const ReadMore = () => {
    const dots = document.getElementById("dots");
    const moreText = document.getElementById("more");
    const moreButton = document.getElementById("moreButton");
    const lessButton = document.getElementById("lessButton");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      lessButton.style.display = "none";
      moreButton.style.display = "inline";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      moreButton.style.display = "none";
      lessButton.style.display = "inline";
      moreText.style.display = "inline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle asChild>
            <h2>{vacancy.title}</h2>
          </CardTitle>
          {vacancy.favorite ? (
            <Heart className="fill-primary text-primary" strokeWidth="3" />
          ) : (
            <Heart className="text-dark-teal" strokeWidth="3" />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="h-20 w-20 rounded-full bg-secondary text-center">
              <Image className="m-auto h-full w-2/3 text-background" />
            </div>
            <p>{vacancy.company}</p>
          </div>
          <div>
            <p>
              {vacancy.description.slice(0, 250)}
              <span id="dots">...</span>
              <span
                data-id={vacancy.id}
                className="text-primary underline hover:text-tertiary"
                id="moreButton"
                onClick={ReadMore}
              >
                meer{" "}
              </span>
              <span id="more" className="hidden">
                {vacancy.description.slice(251)}
              </span>
              <span
                data-id={vacancy.id}
                className="hidden text-primary underline hover:text-tertiary"
                id="lessButton"
                onClick={ReadMore}
              >
                minder{" "}
              </span>
            </p>
            <div className="flex gap-2 pt-2">
              {vacancy.requirements.map((tag) => (
                <p className="rounded-full bg-accent px-3 py-1 text-background">
                  {tag.name}
                </p>
              ))}
            </div>
          </div>
          <DoughnutChart vacancy={vacancy} key={vacancy.id} />
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
