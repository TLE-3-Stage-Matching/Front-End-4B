import { Button } from "@base-ui/react";
import * as React from "react";

function ReadMore({
  children,
  f,
  id,
}: {
  children: React.ReactNode;
  f: () => void;
  id: number;
}) {
  return (
    <Button
      aria-expanded={open}
      aria-controls={`desc-${id}`}
      variant={"link"}
      className="text-primary underline hover:text-tertiary"
      onClick={f}
    >
      {children}
    </Button>
  );
}

export default ReadMore;
