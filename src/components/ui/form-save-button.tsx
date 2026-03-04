import { Button } from "@/components/ui/button";
import React from "react";

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
      disabled={!enabled || loading}
      className={`bg-[var(--accent-cyan)] font-bold hover:bg-[var(--accent-cyan)]/90 ${enabled && !loading ? "text-creme" : "text-[#000]"} disabled:pointer-events-auto disabled:text-[#000] ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"
            />
          </svg>
          Opslaan...
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
