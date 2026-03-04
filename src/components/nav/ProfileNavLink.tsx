import * as React from "react";

type ProfileNavLinkProps = {
  children: React.ReactNode;
  link: string;
};

function ProfileNavLink({ children, link }: ProfileNavLinkProps) {
  return (
    <a
      href={link}
      className={
        "mx-auto w-10/12 bg-(--accent-dark) p-1 text-center text-sm text-[#FBF8F3] hover:bg-accent"
      }
    >
      {children}
    </a>
  );
}

export default ProfileNavLink;
