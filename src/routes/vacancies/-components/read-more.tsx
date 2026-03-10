import { Button } from "@base-ui/react";
import * as React from "react";

function ReadMore({
  children,
  f,
}: {
  children: React.ReactNode;
  f: () => void;
}) {
  return (
    <Button
      variant={"link"}
      className="text-primary underline hover:text-tertiary"
      onClick={f}
    >
      {children}
    </Button>
  );
}

export default ReadMore;
