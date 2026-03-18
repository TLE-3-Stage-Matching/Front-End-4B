import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useQuery } from "@tanstack/react-query";
import { CircleUserRound } from "lucide-react";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export const Route = createFileRoute("/_coordinator/internship-coordinator/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["/api/coordinator/users?role=student&per_page=5"],
  });

  const students = data?.data ?? [];

  useEffect(() => {
    document.title = "StageLink - Coördinator dashboard";
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1>Coördinator dashboard</h1>
        <Card>
          <CardHeader>
            <h2>Studenten</h2>
          </CardHeader>
          <CardContent className="flex justify-between">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-20 w-20 rounded-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <h1>Coördinator dashboard</h1>
      <Card>
        <CardHeader>
          <h2>Studenten</h2>
        </CardHeader>
        <CardContent className="flex justify-evenly">
          {students.length > 0 ? (
            students.map((student: any) => (
              <div className="text-center" key={student.id}>
                <div className="h-20 w-20 rounded-full bg-primary">
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
    </>
  );
}
