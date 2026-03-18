import React from "react";

function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="pt-2 text-center font-headers text-5xl font-extrabold">
      {children}
    </h1>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-headers text-xl font-bold">{children}</h2>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-headers text-lg">{children}</h3>;
}

export { H1, H2, H3 };
