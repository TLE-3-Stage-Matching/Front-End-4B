import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/**
 * Small wrapper that renders a `Label` and either an Input, Textarea or Select
 * depending on the `as` prop. Accepts `id` so the label is properly linked
 * (via `htmlFor`) and `error`/`errorId` for ARIA error association.
 */
export function EditableField({
  label,
  value,
  onChange,
  as = "input",
  isEditing,
  error,
  errorId,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  as?: "input" | "textarea" | "select";
  isEditing?: boolean;
  error?: string;
  errorId?: string;
  id?: string;
}) {
  return (
    <div className="mb-2">
      <Label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </Label>
      <div className={`${isEditing ? "" : "rounded bg-popover p-3"}`}>
        {as === "input" && (
          <Input
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
          />
        )}
        {as === "textarea" && (
          <Textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
          />
        )}
        {as === "select" && (
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={
              "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
            }
          >
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="200+">200+</option>
          </select>
        )}
      </div>
    </div>
  );
}

export default EditableField;
