import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleUserRound } from "lucide-react";

export const Route = createFileRoute("/_coordinator/internship-coordinator/")({
  component: RouteComponent,
});

async function RouteComponent() {
  const { data, status, error } = useQuery({
    queryKey: ["/api/coordinator/users?role=student&per_page=5"],
  });

  const students = await data;

  return (
    <>
      <h1>Coördinator dashboard</h1>
      <div className="px-4">
        <Card>
          <CardHeader>
            <h2>Studenten</h2>
          </CardHeader>
          <CardContent className="flex justify-between">
            {students != null && students?.data?.data?.length > 0 ? (
              students.data.data.map((student) => (
                <div className="text-center">
                  <div className="h-20 w-20 rounded-full bg-accent">
                    <CircleUserRound
                      strokeWidth={1.2}
                      className="h-full w-full text-creme"
                    />
                  </div>
                  <p>{student.first_name}</p>
                </div>
              ))
            ) : (
              <p>geen studenten</p>
            )}
          </CardContent>
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
      </div>
    </>
  );
}
