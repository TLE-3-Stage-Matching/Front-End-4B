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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export const Route = createFileRoute(
  "/_coordinator/internship-coordinator/students",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const [page, setPage] = useState(1);

  const filters = {
    role: "student",
    per_page: "6",
    page: String(page),
    search: search,
    filter: filter ? "1" : "",
  };

  type Student = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    student_profile: {
      searching_status: boolean;
    };
  };

  type StudentsResponse = {
    data: Student[];
    meta: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
  };

  const { data, isLoading } = useQuery<StudentsResponse>({
    queryKey: [`/api/coordinator/users?${new URLSearchParams(filters)}`],
  });

  const SearchSchema = z.object({
    search: z.string().max(255),
    filter: z.boolean(),
  });

  const form = useOverviewForm({
    defaultValues: {
      search: "",
      filter: false,
    },
    validators: {
      onChange: SearchSchema,
    },
    onSubmit: async ({ value }) => {
      setSearch(value.search);
      setFilter(value.filter);
      setPage(1);
    },
  });

  useEffect(() => {
    document.title = "StageLink - Studenten overzicht";
  }, []);

  if (isLoading) {
    return (
      <>
        <h1>Studenten overzicht</h1>
        <div className="flex flex-col gap-1 pb-3">
          {[...Array(6).keys()].map((i) => (
            <Card key={i}>
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
  const students = data?.data ?? [];
  const currentPage = data?.meta?.current_page ?? page;
  const totalPages = data?.meta?.last_page ?? 1;
  return (
    <>
      <h1>Studenten overzicht</h1>
      <div>
        <form
          role="search"
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
          <form.AppField
            name="filter"
            children={(field) => <field.FilterField />}
          />
          <Button asChild>
            <button type="submit">Zoek</button>
          </Button>
        </form>
      </div>

      <div className="flex flex-col gap-1 pb-3">
        {students.length > 0 ? (
          students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))
        ) : (
          <p>geen studenten</p>
        )}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.max(p - 1, 1));
              }}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(i + 1);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
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
