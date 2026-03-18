import { PolarArea } from "react-chartjs-2";
import "./chart-setup.tsx";
import { useMemo } from "react";

type PolarChartVacancyData = {
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
};

function PolarChartSetup({ vacancy }: { vacancy: PolarChartVacancyData }) {
  console.log(vacancy);
  const data = useMemo(
    () => ({
      datasets: [
        {
          label: "Dataset 1",
          data: [
            vacancy.match_result.subscores.must_have.score,
            vacancy.match_result.subscores.nice_to_have.score,
          ],
          backgroundColor: ["#FF6384", "#36A2EB"],
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
