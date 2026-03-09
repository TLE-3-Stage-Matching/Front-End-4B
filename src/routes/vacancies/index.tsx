import { createFileRoute } from "@tanstack/react-router";
import VagancyCard from "@/routes/vacancies/-components/vagancy-card.tsx";

export const Route = createFileRoute("/vacancies/")({
  component: RouteComponent,
});

function RouteComponent() {
  const data = {
    items: [
      {
        id: 1,
        company: "test",
        title: "Test vacature 1",
        hours_per_week: "40",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat auctor eros. Praesent fermentum lectus non nibh maximus varius. Aliquam quis felis nec eros egestas viverra quis sed purus. Vestibulum placerat tortor at quam consectetur, ac mollis libero facilisis. Cras at est ac diam euismod ultricies. In eget ipsum ac est rhoncus tincidunt ut ut odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        offer_text:
          "Aliquam quis felis nec eros egestas viverra quis sed purus. Vestibulum placerat tortor at quam consectetur, ac mollis libero facilisis. ",
        expectations_text:
          "Cras at est ac diam euismod ultricies. In eget ipsum ac est rhoncus tincidunt ut ut odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        matchscore: 50,
      },
      {
        id: 2,
        company: "test2",
        title: "Test vacature 2",
        hours_per_week: "36",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat auctor eros. Praesent fermentum lectus non nibh maximus varius. Aliquam quis felis nec eros egestas viverra quis sed purus. Vestibulum placerat tortor at quam consectetur, ac mollis libero facilisis. Cras at est ac diam euismod ultricies. In eget ipsum ac est rhoncus tincidunt ut ut odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        offer_text:
          "Aliquam quis felis nec eros egestas viverra quis sed purus. Vestibulum placerat tortor at quam consectetur, ac mollis libero facilisis. ",
        expectations_text:
          "Cras at est ac diam euismod ultricies. In eget ipsum ac est rhoncus tincidunt ut ut odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        matchscore: 60,
      },
    ],
  };

  return (
    <section className="mx-auto flex flex-col gap-5 py-5">
      <h1>Aanbevolen stageopdrachten</h1>
      {data.items.map((vacancy) => (
        <VagancyCard vagancy={vacancy} key={vacancy.id} />
      ))}
    </section>
  );
}
