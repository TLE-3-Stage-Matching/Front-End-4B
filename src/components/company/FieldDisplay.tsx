import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

export function FieldDisplay({
  label,
  children,
  isEditing,
}: {
  label: string;
  children: ReactNode;
  isEditing?: boolean;
}) {
  return (
    <div className="mb-2">
      <Label className="mb-1 block text-sm font-medium">{label}</Label>
      <div className={`${isEditing ? "" : "rounded bg-popover p-3"}`}>
        {children}
      </div>
    </div>
  );
}

export default FieldDisplay;
