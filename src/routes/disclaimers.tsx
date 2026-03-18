import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/disclaimers")({
  component: RouteComponent,
});

type DisclaimerArticle = {
  title: string;
  content: string;
};

type DisclaimerSection = {
  title: string;
  articles: DisclaimerArticle[];
};

const disclaimerSections: DisclaimerSection[] = [
  {
    title: "Hoe werkt de matching?",
    articles: [
      {
        title: "Algemene werkwijze",
        content:
          "De matchscore is een geautomatiseerde indicatie van aansluiting tussen vacature-eisen en profielinformatie. We verwerken relevante gegevens op hoofdlijnen om een vergelijkbare en uitlegbare uitkomst te tonen. De score is ondersteunend en niet bedoeld als enige beslisgrond.",
      },
      {
        title: "Belangrijkste inputs",
        content:
          "Voor de matching gebruiken we voornamelijk inhoudelijke profiel- en vacaturegegevens, zoals relevante tags, voorkeuren en vacaturekenmerken. Alleen gegevens die nodig zijn voor het matchdoel worden verwerkt. Niet-relevante persoonsgegevens worden niet meegenomen in de scoreberekening.",
      },
      {
        title: "Wat wordt berekend?",
        content:
          "Het systeem berekent een totaalscore op basis van meerdere deelaspecten. De exacte interne parameters, drempels en technische wegingen worden niet openbaar gemaakt om misbruik, manipulatie en beveiligingsrisico's te beperken.",
      },
      {
        title: "Uitlegvelden",
        content:
          "De interface kan uitleg tonen over waarom een match hoger of lager uitvalt. Deze uitleg is samenvattend en bedoeld voor begrijpelijkheid. Technische implementatiedetails, controlemechanismen en interne validatieregels kunnen bewust worden afgeschermd.",
      },
      {
        title: "Beschikbaarheid per rol",
        content:
          "Studenten krijgen een beknopte, begrijpelijke toelichting. Beheerders kunnen aanvullende context ontvangen voor begeleiding en kwaliteitscontrole. Gevoelige of misbruikgevoelige informatie wordt niet publiek getoond.",
      },
    ],
  },

  {
    title: "Welke data gebruikt de AI?",
    articles: [
      {
        title: "Direct gebruikte velden",
        content:
          "Voor de match gebruiken we relevante gegevens uit profiel en vacature, zoals inhoudelijke kenmerken, ervarings-/vaardigheidsinformatie en vacature-eisen. Waar van toepassing gebruiken we ook contextvelden die nodig zijn voor filtering en presentatie.",
      },
      {
        title: "Niet gebruikt zonder expliciete bron",
        content:
          "Gegevens buiten het matchdoel (zoals privecommunicatie of externe databronnen) worden niet automatisch gebruikt. Verwerking van extra gegevens vindt alleen plaats met een duidelijke grondslag en binnen de geldende privacy- en beveiligingskaders.",
      },
      {
        title: "Dataminimalisatie en bewaarbeleid",
        content:
          "We streven naar dataminimalisatie: alleen noodzakelijke gegevens worden verwerkt en niet langer bewaard dan nodig voor het doel. Toegang tot matchgegevens is beperkt tot geautoriseerde rollen en onderhevig aan interne controles.",
      },
    ],
  },

  {
    title: "Beperkingen en transparantie",
    articles: [
      {
        title: "Geen volledige technische openbaarmaking",
        content:
          "Uit veiligheidsoverwegingen publiceren we geen volledige technische specificaties van de matchlogica. We delen wel de functionele hoofdlijnen, beperkingen en het beoogde gebruik van de score.",
      },
      {
        title: "AI-ondersteuning en menselijke controle",
        content:
          "Geautomatiseerde uitkomsten zijn ondersteunend. In contexten met impact op personen adviseren we altijd menselijke beoordeling. Matchscores kunnen onvolledig zijn en mogen niet als enige basis voor definitieve besluiten dienen.",
      },
      {
        title: "Validatie en bias",
        content:
          "Resultaten zijn afhankelijk van de kwaliteit en actualiteit van ingevoerde gegevens. Onvolledige of inconsistente data kan tot minder nauwkeurige uitkomsten leiden. We monitoren periodiek op kwaliteit en mogelijke bias, maar kunnen nooit volledige foutloosheid garanderen.",
      },
    ],
  },
];

function RouteComponent() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-8">
      <h1 className="mb-10 text-center text-5xl font-bold">Disclaimers</h1>

      <div className="space-y-6">
        {disclaimerSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="text-2xl">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.articles.map((article) => (
                  <details
                    key={`${section.title}-${article.title}`}
                    className="rounded-md border border-input bg-background px-4 py-3"
                  >
                    <summary className="cursor-pointer font-medium">
                      {article.title}
                    </summary>
                    <div className="mt-3 text-sm text-foreground/80">
                      {article.content}
                    </div>
                  </details>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
