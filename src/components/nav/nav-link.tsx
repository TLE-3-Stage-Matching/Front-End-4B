import * as React from "react";
import { Link } from "@tanstack/react-router";

type NavLinkProps = {
  children: React.ReactNode;
  link: string;
};

function NavLink({ children, link }: NavLinkProps) {
  return (
    <Link
      to={link}
      className={
        "mt-2 flex w-full items-center justify-center gap-2 rounded-br-lg bg-tertiary p-2 text-center text-creme hover:bg-secondary active:bg-primary"
      }
    >
      {children}
    </Link>
  );
}

export default NavLink;
