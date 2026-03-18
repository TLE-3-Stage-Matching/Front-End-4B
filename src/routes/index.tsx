import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAuthStore((s) => s.user);
  const fullName = [user?.first_name, user?.middle_name, user?.last_name]
    .filter(Boolean)
    .join(" ");
  return (
    <div className="flex flex-col items-center bg-background px-4">
      {/* Hero */}
      <div
        className={`flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 text-center ${user || "pt-[20vh]"}`}
      >
        <h1 className="text-5xl font-bold tracking-tight">
          Stage<span className="text-primary">link</span>
        </h1>
        <p>Jouw stageplek begint hier</p>

        <p className="text-lg leading-relaxed text-balance">
          Stagelink is de plek om stageplekken te vinden die bij jou aansluiten.
          Onze algoritmes kijken op basis van vaardigheden, kwaliteiten en jouw
          voorkeuren wat het best bij jou past!
        </p>

        {!user && (
          <>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <Button asChild size="lg">
                <Link to="/register">Registreren als Stage coördinator</Link>
              </Button>
              <Button asChild variant="accent" size="lg">
                <Link to="/login">Inloggen</Link>
              </Button>
            </div>
            {/* Info sections */}
            <div className="w-full max-w-5xl space-y-8 py-6 text-balance">
              {/* Row 1 — card left (wider), text right (narrower) */}
              <div className="grid grid-cols-5 items-center gap-8">
                <div className="col-span-3">
                  <Card variant="accent" corner="bl">
                    <CardHeader>
                      <CardDescription className="text-background">
                        Hoe het werkt
                      </CardDescription>
                      <CardTitle asChild className="text-2xl">
                        <h2>Slim matchen op basis van jouw profiel</h2>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Maak een profiel aan met jouw vaardigheden, kwaliteiten en
                      voorkeuren. Ons algoritme analyseert jouw profiel en toont
                      stageplekken die het best bij jou aansluiten, geen
                      eindeloos zoeken meer.
                    </CardContent>
                  </Card>
                </div>
                <div className="col-span-2 space-y-3">
                  <h2 className="text-2xl font-bold">Vind de perfecte stage</h2>
                  <p className="leading-relaxed text-primary">
                    Of je nu op zoek bent naar een creatieve omgeving of een
                    technische uitdaging, Stagelink brengt je in contact met de
                    juiste bedrijven.
                  </p>
                </div>
              </div>

              {/* Row 2 — text left (narrower), card right (wider) */}
              <div className="grid grid-cols-5 items-center gap-8">
                <div className="col-span-2 space-y-3">
                  <h2 className="text-2xl font-bold">
                    Bedrijven die bij jou passen
                  </h2>
                  <p className="leading-relaxed text-primary">
                    Wij werken samen met een breed netwerk van bedrijven die
                    actief op zoek zijn naar gemotiveerde stagiairs uit
                    verschillende opleidingen.
                  </p>
                </div>
                <div className="col-span-3">
                  <Card variant="dark" corner="tl">
                    <CardHeader>
                      <CardDescription className="text-background">
                        Ons netwerk
                      </CardDescription>
                      <CardTitle asChild className="text-2xl">
                        <h2>Honderden bedrijven, één platform</h2>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Van kleine start-ups tot grote ondernemingen, Stagelink
                      heeft een divers aanbod aan stageplekken in uiteenlopende
                      sectoren. Ontdek welke bedrijven er op jou wachten.
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}

        {user && (
          <p className="text-sm text-foreground">
            Welkom terug,{" "}
            <span className="font-medium text-primary">{fullName}</span>!
          </p>
        )}
      </div>
    </div>
  );
}
