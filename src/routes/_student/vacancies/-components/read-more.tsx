import { Button } from "@/components/ui/button";
import * as React from "react";
import { useState } from "react";

function ReadMore({
  children,
  f,
  id,
}: {
  children: React.ReactNode;
  f: () => void;
  id: number;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    f();
  };

  return (
    <Button
      aria-expanded={open}
      aria-controls={`desc-${id}`}
      variant="link"
      className="text-primary underline hover:text-tertiary"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}

export default ReadMore;
