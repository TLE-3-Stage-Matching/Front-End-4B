import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import StudentCard from "@/routes/_coordinator/internship-coordinator/-components/student-card.tsx";
import { useEffect, useState } from "react";
import { useOverviewForm } from "@/hooks/overview.form.ts";
import z from "zod";
import { Button } from "@/components/ui/button.tsx";

export const Route = createFileRoute(
  "/_coordinator/internship-coordinator/students",
)({
  component: RouteComponent,
});

async function RouteComponent() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const SearchSchema = z.object({
    search: z.string().max(255),
  });

  const form = useOverviewForm({
    defaultValues: {
      search: "",
    },
    validators: {
      onChange: SearchSchema,
    },
    onSubmit: async ({ value }) => {
      setSearch(value.search);
    },
  });

  const filters = {
    role: "student",
    per_page: 5,
    page: page,
    search: search,
  };

  const { data } = useQuery({
    queryKey: [`/api/coordinator/users?${new URLSearchParams(filters)}`],
  });

  const students = await data;

  useEffect(() => {
    document.title = "StageLink - Studenten overzicht";
  }, []);

  return (
    <>
      <h1>Studenten overzicht</h1>
      <div>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.AppField
            name="search"
            children={(field) => <field.SearchField label={"search"} />}
          />
          <Button asChild>
            <button type="submit">Zoek</button>
          </Button>
        </form>
      </div>

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
