import * as React from "react";

function ReadMore({
  children,
  f,
}: {
  children: React.ReactNode;
  f: React.ReactNode;
}) {
  return (
    <span className="text-primary underline hover:text-tertiary" onClick={f}>
      {children}
    </span>
  );
}

export default ReadMore;
