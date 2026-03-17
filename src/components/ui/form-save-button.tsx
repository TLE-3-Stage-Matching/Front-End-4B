import { Button } from "@/components/ui/button";
import React from "react";
import { Spinner } from "./spinner";

export interface SaveButtonProps extends React.ComponentProps<"button"> {
  children?: React.ReactNode;
  enabled?: boolean;
  loading?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function FormSaveButton({
  children = "Opslaan",
  enabled = true,
  loading = false,
  className = "",
  ariaLabel = "Opslaan",
  ...props
}: SaveButtonProps) {
  return (
    <Button
      type="submit"
      className={`bg-light-cyan font-bold text-creme hover:bg-light-cyan/90 disabled:pointer-events-auto disabled:bg-light-cyan/20 disabled:text-foreground/50 ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Spinner />
          Opslaan...
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
