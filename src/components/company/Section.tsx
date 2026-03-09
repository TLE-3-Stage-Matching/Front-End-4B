import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-b border-border pt-6 pb-6 ${className}`}>
      {children}
    </div>
  );
}

export default Section;
