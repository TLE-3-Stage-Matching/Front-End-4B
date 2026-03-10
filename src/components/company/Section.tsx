import type { ReactNode } from "react";

/**
 * Semantische wrapper voor secties op het bedrijfsprofiel.
 * - Als `title` gegeven wordt, renderen we een <h2> en zetten `aria-labelledby`.
 * - `id` kan gebruikt worden om direct te linken of om focus/scroll naar een sectie te zetten.
 */
export function Section({
  children,
  className = "",
  title,
  id,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  id?: string;
}) {
  return (
    <section
      aria-labelledby={title ? (id ?? undefined) : undefined}
      id={id}
      className={`border-b border-border pt-6 pb-6 ${className}`}
    >
      {title ? (
        <h2 className="mb-3 text-lg font-semibold text-foreground">{title}</h2>
      ) : null}
      {children}
    </section>
  );
}

export default Section;
