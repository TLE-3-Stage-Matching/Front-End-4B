import { PolarArea } from "react-chartjs-2";
import "./chart-setup.tsx";
import type { Vacancy } from "@/types/vacancy.ts";
import { useMemo } from "react";

function PolarChartSetup({ vacancy }: { vacancy: Vacancy }) {
  // console.log(vacancy);
  const data = useMemo(
    () => ({
      datasets: [
        {
          label: "Dataset 1",
          data: [65, 59, 80],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    }),
    [],
  );

  const options = {
    responsive: true,
    events: [],
    plugins: {
      tooltip: false,
    },
  };

  return <PolarArea data={data} options={options} />;
}

export default PolarChartSetup;
