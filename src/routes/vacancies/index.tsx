import { createFileRoute } from "@tanstack/react-router";
import VacancyCard from "@/routes/vacancies/-components/vacancy-card.tsx";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/vacancies/")({
  component: RouteComponent,
});

function RouteComponent() {
  // dummy data to test
  const data = {
    items: [
      {
        id: 1,
        company: "test",
        title: "Test vacature 1",
        hours_per_week: 40,
        requirements: [
          { id: 3, name: "Laravel" },
          { id: 4, name: "SQL" },
        ],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat auctor eros. Praesent fermentum lectus non nibh maximus varius. Aliquam quis felis nec eros egestas viverra quis sed purus. Vestibulum placerat tortor at quam consectetur, ac mollis libero facilisis. Cras at est ac diam euismod ultricies. In eget ipsum ac est rhoncus tincidunt ut ut odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        offer_text:
          "Aliquam quis felis nec eros egestas viverra quis sed purus. Vestibulum placerat tortor at quam consectetur, ac mollis libero facilisis. ",
        expectations_text:
          "Cras at est ac diam euismod ultricies. In eget ipsum ac est rhoncus tincidunt ut ut odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        matchscore: 50,
        favorite: false,
      },
      {
        id: 2,
        company: "test2",
        title: "Test vacature 2",
        hours_per_week: 36,
        requirements: [
          { id: 1, name: "React.js" },
          { id: 2, name: "Tailwind CSS" },
        ],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat auctor eros. Praesent fermentum lectus non nibh maximus varius. Aliquam quis felis nec eros egestas viverra quis sed purus. Vestibulum placerat tortor at quam consectetur, ac mollis libero facilisis. Cras at est ac diam euismod ultricies. In eget ipsum ac est rhoncus tincidunt ut ut odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        offer_text:
          "Aliquam quis felis nec eros egestas viverra quis sed purus. Vestibulum placerat tortor at quam consectetur, ac mollis libero facilisis. ",
        expectations_text:
          "Cras at est ac diam euismod ultricies. In eget ipsum ac est rhoncus tincidunt ut ut odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        matchscore: 60,
        favorite: true,
      },
    ],
  };

  // for if there is something in the backend:
  // const { data } = useQuery({
  //   queryKey: ["repoData"],
  //   queryFn: () =>
  //     fetch("https://back-end-main-2fian7.laravel.cloud/api/v1/vacancies").then(
  //       (res) => res.json(),
  //     ),
  // });

  return (
    <section className="flex flex-col gap-5 px-4 pt-2">
      <h1 className="text-center">Aanbevolen stageopdrachten</h1>
      {data.items.map((vacancy) => (
        <VacancyCard vacancy={vacancy} key={vacancy.id} />
      ))}
      {/* for if there is something in the backend: */}
      {/*{data.data.length < 0 ? (*/}
      {/*  data.data.map((vacancy) => (*/}
      {/*    <VacancyCard vacancy={vacancy} key={vacancy.id} />*/}
      {/*  ))*/}
      {/*) : (*/}
      {/*  <p>Geen opdrachten beschikbaar</p>*/}
      {/*)}*/}
    </section>
  );
}
