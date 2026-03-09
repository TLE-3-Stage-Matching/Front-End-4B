import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image } from "lucide-react";
import DoughnutChart from "@/routes/vacancies/-components/doughnut-chart.tsx";
import { Button } from "@base-ui/react";

function VagancyCard({ vagancy }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle asChild>
          <h2>{vagancy.title}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="text-center">
          <div className="h-20 w-20 rounded-full bg-secondary text-center">
            <Image className="m-auto h-full w-2/3" />
          </div>
          <p>{vagancy.company}</p>
        </div>
        <div>
          <p>{vagancy.description}</p>
        </div>
        <DoughnutChart vagancy={vagancy} key={vagancy.id} />
      </CardContent>
    </Card>
  );
}

export default VagancyCard;
