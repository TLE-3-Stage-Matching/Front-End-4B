import {
  Chart as ChartJS,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend, Title);
