import React from "react";
import { useFieldContext } from "@/hooks/context";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";

function TitleField() {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Functietitel</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder="Bijv. Front-end developer"
        autoComplete="off"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

function HoursSelect() {
  const field = useFieldContext<number | undefined>();

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>Uren per week</FieldLabel>
      <Select
        value={field.state.value ? field.state.value.toString() : undefined}
        onValueChange={(val) =>
          field.handleChange(val ? Number(val) : undefined)
        }
      >
        <SelectTrigger id={field.name}>
          <SelectValue placeholder="Kies uren" />
        </SelectTrigger>
        <SelectContent>
          {[8, 16, 24, 32, 40].map((h) => (
            <SelectItem key={h} value={h.toString()}>
              {h} uur
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}

function TagsField() {
  const field = useFieldContext<any[]>();
  const form = field.form;
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  // local input state for new tag
  const [input, setInput] = React.useState("");
  const [type, setType] = React.useState<"skill" | "quality">("skill");

  function addTag() {
    const val = input.trim();
    if (!val) return;
    const current = field.state.value || [];
    const updated = [...current, { name: val, tag_type: type }];
    form.setFieldValue(field.name, updated);
    setInput("");
  }

  function removeTag(idx: number) {
    const current = field.state.value || [];
    const updated = current.filter((_, i) => i !== idx);
    form.setFieldValue(field.name, updated);
  }

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>
        Tags (skills / eigenschappen)
      </FieldLabel>
      <div className="mb-2 flex flex-wrap gap-2">
        {(field.state.value || []).map((t: any, i: number) => (
          <Badge key={i}>
            {typeof t === "string" ? t : t.name}
            <button
              className="ml-2"
              onClick={() => removeTag(i)}
              aria-label="Verwijder"
            >
              <Trash />
            </button>
          </Badge>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          id={`${field.name}-new`}
          placeholder="Nieuwe tag"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Select value={type} onValueChange={(v) => setType(v as any)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="skill">Vaardigheid</SelectItem>
            <SelectItem value="quality">Eigenschap</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addTag}>Voeg toe</Button>
      </div>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

function DescriptionField({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          rows={6}
          placeholder={placeholder ?? "Typ hier om toevoegen..."}
        />
      </InputGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

export { TitleField, HoursSelect, TagsField, DescriptionField };
