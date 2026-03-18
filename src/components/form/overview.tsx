import { useFieldContext } from "@/hooks/context.ts";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group.tsx";
import { Search } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

function SearchField({
  placeholder = "Zoek student",
  autocomplete = "off",
  type = "text",
}: InputFieldProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <InputGroup className="my-2 w-full bg-card">
      <InputGroupInput
        id={field.name}
        name={field.name}
        value={field.state.value}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        autoComplete={autocomplete}
        type={type}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <InputGroupAddon>
        <Search className="text-dark-teal" />
      </InputGroupAddon>
    </InputGroup>
  );
}

function FilterField() {
  const field = useFieldContext<boolean>();

  return (
    <Field className="w-50">
      <div className="flex items-center gap-2">
        <Checkbox
          id={field.name}
          checked={field.state.value}
          onCheckedChange={(checked) => field.handleChange(checked === true)}
        />
        <FieldLabel htmlFor={field.name}>Stage gevonden</FieldLabel>
      </div>
    </Field>
  );
}

export { SearchField, FilterField };
