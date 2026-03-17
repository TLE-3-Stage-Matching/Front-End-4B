import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import StudentCard from "@/routes/_coordinator/internship-coordinator/-components/student-card.tsx";
import { useEffect, useState } from "react";
import { useOverviewForm } from "@/hooks/overview.form.ts";
import z from "zod";
import { Button } from "@/components/ui/button.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export const Route = createFileRoute(
  "/_coordinator/internship-coordinator/students",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filters = {
    role: "student",
    per_page: 6,
    page: page,
    search: search,
  };

  const { data, isLoading } = useQuery({
    queryKey: [`/api/coordinator/users?${new URLSearchParams(filters)}`],
  });

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

  const students = data;
  console.log(data?.data ?? "error");
  const totalPages = data?.data?.last_page ?? 1;

  useEffect(() => {
    document.title = "StageLink - Studenten overzicht";
  }, []);

  if (isLoading) {
    return (
      <>
        <h1>Studenten overzicht</h1>
        <div className="flex flex-col gap-1 pb-3">
          {[...Array(6).keys()].map(() => (
            <Card>
              <CardContent className="flex items-center justify-between">
                <div className="flex flex-2 gap-2">
                  <Skeleton className="h-20 w-20 rounded-full" />
                  <div className="flex flex-col items-center gap-2">
                    <Skeleton className="h-5 w-30" />
                    <Skeleton className="h-5 w-25" />
                  </div>
                </div>
                <div className="flex-2">
                  <Skeleton className="h-5 w-25" />
                </div>
                <div className="flex flex-1 gap-2">
                  <Skeleton className="h-5 w-10" />
                  <Skeleton className="h-5 w-10" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </>
    );
  }

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

      <div className="flex flex-col gap-1 pb-3">
        {students != null && students?.data?.data?.length > 0 ? (
          students.data.data.map((student) => <StudentCard student={student} />)
        ) : (
          <p>geen studenten</p>
        )}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.max(p - 1, 1));
              }}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={page === i + 1}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.min(p + 1, totalPages));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
