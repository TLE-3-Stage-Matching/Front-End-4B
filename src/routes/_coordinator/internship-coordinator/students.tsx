import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleUserRound } from "lucide-react";
import StudentCard from "@/routes/_coordinator/internship-coordinator/-components/student-card.tsx";

export const Route = createFileRoute(
  "/_coordinator/internship-coordinator/students",
)({
  component: RouteComponent,
});

async function RouteComponent() {
  const queryClient = useQueryClient();

  const studentsQuery = useQuery({
    queryKey: ["/api/coordinator/users?role=student&per_page=5"],
  });

  const students = await studentsQuery.data;

  return (
    <>
      <h1>Studenten overzicht</h1>

      <div className="flex flex-col gap-1">
        {students != null && students?.data?.data?.length > 0 ? (
          students.data.data.map((student) => <StudentCard student={student} />)
        ) : (
          <p>geen studenten</p>
        )}
      </div>
    </>
  );
}
