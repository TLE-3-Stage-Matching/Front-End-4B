import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_coordinator/internship-coordinator/")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();

  const students = useQuery({
    queryKey: ["/api/coordinator/users/role=student"],
  });

  return (
    <>
      <Card>
        <CardHeader>
          <h2>Studenten</h2>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <div className="w-full text-right">
            <Button asChild>
              <Link to={"/internship-coordinator/students"}>
                Studenten inzien
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
