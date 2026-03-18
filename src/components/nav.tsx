import { CircleUserRound, LogOut, Mail } from "lucide-react";
import ProfileNav from "@/components/nav/profile-nav.tsx";
import NavLink from "@/components/nav/nav-link.tsx";
import { useAuthStore } from "@/store/auth";
import { Link } from "@tanstack/react-router";

function Nav() {
  const { user } = useAuthStore((s) => s);
  const role = useAuthStore((s) => s.user?.role);
  const fullName = [user?.first_name, user?.middle_name, user?.last_name]
    .filter(Boolean)
    .join(" ");

  return (
    <nav
      role="navigation"
      className="sticky top-0 flex h-screen w-full max-w-62.5 min-w-3xs flex-col overflow-y-auto text-creme"
    >
      <div className="relative bg-tertiary pb-12">
        <p className="pt-4 text-center text-2xl font-bold">
          {user ? `${fullName}` : ""}
        </p>
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
          <NavLink to={"/"}>Home</NavLink>
          {/* nav for student */}
          {role == "student" && (
            <>
              <NavLink to={"/profile"}>Profiel</NavLink>
              <ProfileNav />
              <NavLink to={"/vacancies"}>Mijn stages</NavLink>
            </>
          )}
          {/* nav for coördinators */}
          {role == "coordinator" && (
            <>
              <NavLink to={"/internship-coordinator/profile"}>Profiel</NavLink>
              <NavLink to={"/internship-coordinator/register"}>
                Registreer nieuwe gebruikers
              </NavLink>
            </>
          )}
          {/* nav for company users */}
          {role == "company" && (
            <>
              <NavLink to={"/company/profile"}>Profiel</NavLink>
              <NavLink to={"/company"}>Bedrijfsprofiel</NavLink>
              <NavLink to={"/company/overview"}>Stage opdrachten</NavLink>
            </>
          )}
        </div>

        <div>
          <NavLink to={"/"}>
            <Mail className={"h-5 w-5"} /> Inbox
          </NavLink>
          <NavLink to={"/logout"}>
            <LogOut className={"h-5 w-5"} /> Uitloggen
          </NavLink>
          <div className="mt-2 text-center">
            <Link
              to="/disclaimers"
              className="text-[13px] text-creme/90 underline underline-offset-2 hover:text-creme"
            >
              Disclaimers over AI
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
