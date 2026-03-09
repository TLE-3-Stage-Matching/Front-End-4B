import { Doughnut } from "react-chartjs-2";
import "./chart-setup.tsx";

function DoughnutChart({ vagancy }) {
  const data = {
    datasets: [
      {
        label: "Match score",
        data: [vagancy.matchscore, 100 - vagancy.matchscore],
        backgroundColor: ["#228073FF", "#000000"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Matchscore",
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
        key={`${vagancy.id}-${vagancy.matchscore}`}
      />
    </div>
  );
}

export default DoughnutChart;
