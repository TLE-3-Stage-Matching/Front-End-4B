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
import { H1, H2 } from "@/components/ui/headings.tsx";

export const Route = createFileRoute("/_coordinator/internship-coordinator/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["/api/coordinator/users?role=student&per_page=5"],
  });

  const students = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <H1>Coördinator dashboard</H1>
        <Card>
          <CardHeader>
            <H2>Studenten</H2>
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
      <H1>Coördinator dashboard</H1>
      <div className="flex flex-col gap-4">
        <Card className="mt-4">
          <CardHeader>
            <H2>Studenten</H2>
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
        <Card>
          <CardHeader>
            <H2>Bedrijven</H2>
          </CardHeader>
          <CardFooter>
            <div className="w-full text-right">
              <Button asChild>
                <Link to={"/internship-coordinator/companies"}>
                  Bedrijven inzien
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
