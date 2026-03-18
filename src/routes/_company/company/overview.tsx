import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { router } from "@/router";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export const Route = createFileRoute("/_company/company/overview")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useQuery<{ data: any[] }>({
    queryKey: ["/api/company/vacancies"],
  });

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const items = data?.data ?? [];
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  useEffect(() => {
    document.title = `StageLink - Overzicht vacatures`;
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginated = items.slice((page - 1) * pageSize, page * pageSize);

  const splitRequirements = (vacancy: any) => {
    const reqs = vacancy?.vacancy_requirements ?? [];
    const skills = reqs.filter(
      (r: any) => (r.tag?.tag_type ?? r.requirement_type) === "skill",
    );
    const traits = reqs.filter(
      (r: any) => (r.tag?.tag_type ?? r.requirement_type) === "trait",
    );
    const majors = reqs.filter(
      (r: any) => (r.tag?.tag_type ?? r.requirement_type) === "major",
    );
    return { skills, traits, majors };
  };

  function goTo(p: number) {
    setPage(Math.max(1, Math.min(totalPages, p)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const startPage = Math.max(1, page - 3);
  const endPage = Math.min(totalPages, page + 3);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mijn vacatures</h1>
        <Button onClick={() => router.navigate({ to: "/company/vacancies" })}>
          Nieuwe vacature
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gepubliceerde stageopdrachten</CardTitle>
          <CardDescription>
            Overzicht van vacatures voor jouw bedrijf
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm text-foreground">
                <Spinner className="size-5" />
                <span>Vacatures laden...</span>
              </div>

              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-2/5" />
                    <Skeleton className="h-5 w-24" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <Skeleton className="mb-2 h-4 w-28" />
                        <div className="flex flex-wrap gap-2">
                          <Skeleton className="h-6 w-24" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                      </div>
                      <div>
                        <Skeleton className="mb-2 h-4 w-28" />
                        <div className="flex flex-wrap gap-2">
                          <Skeleton className="h-6 w-24" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                      </div>
                      <div>
                        <Skeleton className="mb-2 h-4 w-24" />
                        <div className="flex flex-wrap gap-2">
                          <Skeleton className="h-6 w-28" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Skeleton className="h-9 w-32" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <p>Fout bij laden: {(error as Error)?.message}</p>
          ) : items.length ? (
            <>
              <ul
                role="list"
                aria-label="Vacatures"
                className="flex flex-col gap-3"
              >
                {paginated.map((vacancy: any) => (
                  <li key={vacancy.id} role="listitem">
                    <Card
                      role="article"
                      aria-labelledby={`vacancy-title-${vacancy.id}`}
                      aria-describedby={`vacancy-hours-${vacancy.id}`}
                    >
                      <CardHeader>
                        <CardTitle asChild>
                          <h2
                            id={`vacancy-title-${vacancy.id}`}
                            className="text-lg"
                          >
                            {vacancy.title}
                          </h2>
                        </CardTitle>
                        <CardDescription
                          id={`vacancy-hours-${vacancy.id}`}
                          className="text-lg text-foreground"
                        >
                          {vacancy.hours_per_week
                            ? `${vacancy.hours_per_week} uur`
                            : ""}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {(() => {
                          const { skills, traits, majors } =
                            splitRequirements(vacancy);
                          const hasAny =
                            skills.length || traits.length || majors.length;

                          if (!hasAny) {
                            return (
                              <p className="text-sm text-foreground">
                                Geen tags toegevoegd
                              </p>
                            );
                          }

                          return (
                            <div className="space-y-3">
                              <div>
                                <p className="mb-1 text-sm font-semibold">
                                  Vaardigheden
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {skills.length ? (
                                    skills.map((tag: any) => (
                                      <Badge
                                        key={`skill-${tag.tag?.id || tag.id}`}
                                        variant="skill"
                                      >
                                        {tag.tag?.name || tag.name}
                                      </Badge>
                                    ))
                                  ) : (
                                    <p className="text-xs text-foreground">
                                      Geen vaardigheden
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div>
                                <p className="mb-1 text-sm font-semibold">
                                  Eigenschappen
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {traits.length ? (
                                    traits.map((tag: any) => (
                                      <Badge
                                        key={`trait-${tag.tag?.id || tag.id}`}
                                        variant="quality"
                                      >
                                        {tag.tag?.name || tag.name}
                                      </Badge>
                                    ))
                                  ) : (
                                    <p className="text-xs text-foreground">
                                      Geen eigenschappen
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div>
                                <p className="mb-1 text-sm font-semibold">
                                  Opleidingen
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {majors.length ? (
                                    majors.map((tag: any) => (
                                      <Badge
                                        key={`major-${tag.tag?.id || tag.id}`}
                                        variant="quality"
                                      >
                                        {tag.tag?.name || tag.name}
                                      </Badge>
                                    ))
                                  ) : (
                                    <p className="text-xs text-foreground">
                                      Geen opleidingen
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        <div className="mt-4 text-right">
                          <Button asChild>
                            <Link
                              to={"/company/vacancy/$id"}
                              params={{ id: vacancy.id }}
                            >
                              Bekijk opdracht
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Pagination>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(page - 1);
                    }}
                    aria-disabled={page === 1}
                  />
                  <PaginationContent>
                    {startPage > 1 && (
                      <>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              goTo(1);
                            }}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        {startPage > 2 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                      </>
                    )}

                    {Array.from(
                      { length: endPage - startPage + 1 },
                      (_, i) => startPage + i,
                    ).map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={p === page}
                          onClick={(e) => {
                            e.preventDefault();
                            goTo(p);
                          }}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {endPage < totalPages && (
                      <>
                        {endPage < totalPages - 1 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              goTo(totalPages);
                            }}
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}
                  </PaginationContent>

                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(page + 1);
                    }}
                    aria-disabled={page === totalPages}
                  />
                </Pagination>
              </div>
            </>
          ) : (
            <p>Geen vacatures gevonden</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
