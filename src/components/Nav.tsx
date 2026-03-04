import { CircleUserRound, Mail } from "lucide-react";
import ProfileNav from "@/components/nav/ProfileNav.tsx";
import NavLink from "@/components/nav/NavLink.tsx";

function Nav() {
  return (
    <nav
      role="navigation"
      className={"sticky top-0 flex h-screen w-[22vw] flex-col text-(--creme)"}
    >
      <div className={"h-2/12 bg-tertiary"}>
        {/* Fill with logged-in users name and profile picture */}
        <p className={"pt-2 text-center text-2xl font-bold"}>Naam</p>
        {/* if there is no profile picture do this */}
        <div
          className={
            "relative top-2 m-auto h-[12vw] w-[12vw] rounded-full bg-(--creme)"
          }
        >
          <CircleUserRound
            strokeWidth={1.2}
            color={"var(--accent-dark)"}
            className={"h-full w-full"}
          />
        </div>
        {/* if there is a profile picture do this (insert profile image) */}
      </div>

      <div
        className={
          "flex grow flex-col justify-between bg-primary px-2 pt-[5vw] pb-4 md:pt-[5vw] lg:pt-[7vw]"
        }
      >
        <div className={"flex flex-col gap-2"}>
          <NavLink link={"/"}>Home</NavLink>
          <NavLink link={"/profile"}>Profiel</NavLink>

          {/* opens the profile links if your on /profile */}
          <ProfileNav aria-label={"profiel-navigatie"} />

          <NavLink link={"/"}>Stage opdrachten</NavLink>
        </div>

        <NavLink link={"/"}>
          {" "}
          <Mail className={"h-5 w-5"} /> Inbox
        </NavLink>
      </div>
    </nav>
  );
}

export default Nav;
