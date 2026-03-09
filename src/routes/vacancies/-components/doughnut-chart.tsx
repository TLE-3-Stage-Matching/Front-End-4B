import { Doughnut } from "react-chartjs-2";
import "./chart-setup.tsx";
import type { Vacancy } from "@/types/vacancy.ts";

function DoughnutChart({ vacancy }: { vacancy: Vacancy }) {
  const data = {
    datasets: [
      {
        label: "Match score",
        data: [vacancy.matchscore, 100 - vacancy.matchscore],
        backgroundColor: ["#228073FF", "#000000"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: false,
      title: {
        display: true,
        text: "Matchscore:",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          top: 0,
          bottom: 0,
        },
      },
    },
  };

  return (
    <div className="w-40">
      <Doughnut
        data={data}
        options={options}
        key={`${vacancy.id}-${vacancy.matchscore}`}
      />
      <p className="relative -top-20 left-16">{vacancy.matchscore}%</p>
    </div>
  );
}

export default DoughnutChart;
