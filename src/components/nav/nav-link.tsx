import * as React from "react";
import { Link, type LinkProps } from "@tanstack/react-router";

type NavLinkProps = LinkProps & {
  children: React.ReactNode;
};

function NavLink({ children, ...props }: NavLinkProps) {
  return (
    <Link
      {...props}
      className={
        "mt-2 flex w-full items-center justify-center gap-2 rounded-br-lg bg-tertiary p-2 text-center text-creme hover:bg-secondary active:bg-primary"
      }
    >
      {children}
    </Link>
  );
}

export default NavLink;
