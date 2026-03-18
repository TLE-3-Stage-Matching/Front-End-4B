import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/auth";

export const Route = createFileRoute("/_company/company/vacancy/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = useParams({ from: "/_company/company/vacancy/$id" });
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = `StageLink - Overzicht vacatures`;
    const fetchVacancy = async () => {
      setLoading(true);
      setError(null);
      try {
        const { token } = useAuthStore.getState();
        const res = await fetch(`/api/company/vacancies/${params.id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          throw new Error(`Fout ${res.status}`);
        }

        const body = await res.json().catch(() => null);
        setData(body?.data ?? body ?? null);
      } catch (err: any) {
        setError(err?.message ?? "Kon vacature niet laden");
      } finally {
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [params.id]);

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Spinner className="size-5" />
              <span>Vacature laden...</span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-8 w-24" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-6 space-y-3">
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

            <div className="space-y-4">
              <div>
                <Skeleton className="mb-2 h-5 w-28" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-4/5" />
              </div>

              <div>
                <Skeleton className="mb-2 h-5 w-28" />
                <Skeleton className="h-4 w-full" />
              </div>

              <div>
                <Skeleton className="mb-2 h-5 w-36" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Skeleton className="h-9 w-24" />
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }
  if (error) return <p>Fout: {error}</p>;
  if (!data) return <p>Geen vacature gevonden</p>;

  const requirements = data?.vacancy_requirements ?? [];
  const skills = requirements.filter(
    (r: any) => (r.tag?.tag_type ?? r.requirement_type) === "skill",
  );
  const traits = requirements.filter(
    (r: any) => (r.tag?.tag_type ?? r.requirement_type) === "trait",
  );
  const educations = requirements.filter(
    (r: any) => (r.tag?.tag_type ?? r.requirement_type) === "education",
  );

  return (
    <section
      role="main"
      aria-labelledby="vacancy-title"
      className="mx-auto w-full max-w-3xl px-4 py-8"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle asChild>
              <h1 id="vacancy-title" className="text-2xl">
                {data.title}
              </h1>
            </CardTitle>
            <span className="text-2xl">
              {data.hours_per_week ? `${data.hours_per_week} uur` : ""}
            </span>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-6 space-y-3">
            <div>
              <p className="mb-1 text-sm font-semibold">Vaardigheden</p>
              <div className="flex flex-wrap gap-2">
                {skills.length ? (
                  skills.map((r: any) => (
                    <Badge key={`skill-${r.tag?.id || r.id}`} variant="skill">
                      {r.tag?.name || r.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs text-foreground">Geen vaardigheden</p>
                )}
              </div>
            </div>

            <div>
              <p className="mb-1 text-sm font-semibold">Eigenschappen</p>
              <div className="flex flex-wrap gap-2">
                {traits.length ? (
                  traits.map((r: any) => (
                    <Badge key={`trait-${r.tag?.id || r.id}`} variant="quality">
                      {r.tag?.name || r.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs text-foreground">Geen eigenschappen</p>
                )}
              </div>
            </div>

            <div>
              <p className="mb-1 text-sm font-semibold">Opleidingen</p>
              <div className="flex flex-wrap gap-2">
                {educations.length ? (
                  educations.map((r: any) => (
                    <Badge
                      key={`education-${r.tag?.id || r.id}`}
                      variant="quality"
                    >
                      {r.tag?.name || r.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs text-foreground">Geen opleidingen</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="font-semibold">Omschrijving</h2>
              <p className="text-sm">{data.description}</p>
            </div>
            <div>
              <h2 className="font-semibold">Wat bieden wij?</h2>
              <p className="text-sm">{data.offer_text}</p>
            </div>
            <div>
              <h2 className="font-semibold">Wat verwachten wij?</h2>
              <p className="text-sm">{data.expectations_text}</p>
            </div>
          </div>

          <div className="mt-6 text-right">
            <Button onClick={() => window.history.back()}>Terug</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
