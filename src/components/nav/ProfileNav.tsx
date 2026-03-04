import { useLocation } from "@tanstack/react-router";
import ProfileNavLink from "@/components/nav/ProfileNavLink.tsx";

function ProfileNav() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/profile" ? (
        <>
          <ProfileNavLink link={"#personal-data"}>Gegevens</ProfileNavLink>
          <ProfileNavLink link={"#bio"}>Over mij</ProfileNavLink>
          <ProfileNavLink link={"#experience"}>Ervaringen</ProfileNavLink>
          <ProfileNavLink link={"#skills"}>Vaardigheden</ProfileNavLink>
          <ProfileNavLink link={"#qualities"}>Eigenschappen</ProfileNavLink>
          <ProfileNavLink link={"#preferences"}>Stagevoorkeuren</ProfileNavLink>
          <ProfileNavLink link={"#companies"}>
            Favoriete bedrijven
          </ProfileNavLink>
          <ProfileNavLink link={"#assignments"}>
            Opgeslagen Opdrachten
          </ProfileNavLink>
        </>
      ) : null}
    </>
  );
}

export default ProfileNav;
