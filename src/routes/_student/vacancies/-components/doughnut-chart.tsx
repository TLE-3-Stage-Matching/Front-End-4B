import { Doughnut } from "react-chartjs-2";
import "./chart-setup.tsx";
import type { Vacancy } from "@/types/vacancy.ts";

function DoughnutChart({ vacancy }: { vacancy: Vacancy }) {
  //vacancy.matchscore, 100 - vacancy.matchscore
  const number = 60;
  // console.log(number);

  const data = {
    datasets: [
      {
        label: "Match score",
        data: [number, 100 - number],
        backgroundColor: ["#228073FF", "#000000"],
        borderWidth: 0,
      },
    ],
  };

  // this adds the text in the middle of the chart
  const centerTextPlugin = {
    id: "centerText",
    afterDraw(chart) {
      const { ctx, chartArea } = chart;

      const value = number + "%";

      ctx.save();
      ctx.font = "bold 24px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const x = (chartArea.left + chartArea.right) / 2;
      const y = (chartArea.top + chartArea.bottom) / 2;

      ctx.fillText(value, x, y);
      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    events: [],
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
    <div className="relative -top-7 w-40">
      <Doughnut
        data={data}
        options={options}
        key={`${vacancy.id}-${vacancy.matchscore}`}
        plugins={[centerTextPlugin]}
        role="img"
        tabIndex={0}
        aria-label={`Matchscore ${vacancy.matchscore} %`}
      />
    </div>
  );
}

export default DoughnutChart;
