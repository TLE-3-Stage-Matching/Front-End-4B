import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function EditableField({
  label,
  value,
  onChange,
  as = "input",
  isEditing,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  as?: "input" | "textarea" | "select";
  isEditing?: boolean;
}) {
  return (
    <div className="mb-2">
      <Label className="mb-1 block text-sm font-medium">{label}</Label>
      <div className={`${isEditing ? "" : "rounded bg-popover p-3"}`}>
        {as === "input" && (
          <Input value={value} onChange={(e) => onChange(e.target.value)} />
        )}
        {as === "textarea" && (
          <Textarea value={value} onChange={(e) => onChange(e.target.value)} />
        )}
        {as === "select" && (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 block w-full rounded border border-input bg-transparent px-3 py-1"
          >
            <option>1-10</option>
            <option>11-50</option>
            <option>51-200</option>
            <option>200+</option>
          </select>
        )}
      </div>
    </div>
  );
}

export default EditableField;
