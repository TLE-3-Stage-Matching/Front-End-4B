import { CircleUserRound, Mail } from "lucide-react";
import ProfileNav from "@/components/nav/ProfileNav.tsx";
import NavLink from "@/components/nav/NavLink.tsx";

function Nav() {
  return (
    <nav
      role="navigation"
      className="sticky top-0 flex h-screen w-full max-w-62.5 flex-col overflow-y-auto text-creme"
    >
      <div className="relative bg-tertiary pb-12">
        {/* Fill with logged-in users name and profile picture */}
        <p className="text-center text-2xl font-bold">Naam</p>
        {/* if there is no profile picture do this */}
        <div className={"mt-12 flex justify-center"}>
          <div className="absolute mx-auto mt-7 -mb-14 h-35 w-35 -translate-y-1/2 rounded-full bg-creme">
            <CircleUserRound
              strokeWidth={1.2}
              className="h-full w-full text-dark-teal"
            />
            {/* if there is a profile picture do this (insert profile image) */}
          </div>
        </div>
      </div>

      <div className="flex grow flex-col justify-between bg-primary px-2 pt-15 pb-4">
        <div className={"flex flex-col"}>
          <NavLink link={"/"}>Home</NavLink>
          <NavLink link={"/profile"}>Profiel</NavLink>

          {/* opens the profile links if your on /profile */}
          <ProfileNav />

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
