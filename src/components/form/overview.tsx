import { useFieldContext } from "@/hooks/context.ts";
import { Field, FieldError, FieldLabel } from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group.tsx";
import { Search } from "lucide-react";

function SearchField({
  label,
  placeholder,
  autocomplete = "off",
  type = "text",
}: InputFieldProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <InputGroup className="my-2 bg-card">
      <InputGroupInput placeholder="Zoek student..." />
      <InputGroupAddon>
        <Search className="text-dark-teal" />
      </InputGroupAddon>
    </InputGroup>
  );

  // <Field data-invalid={isInvalid}>
  //   <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
  //   <Input
  //     id={field.name}
  //     name={field.name}
  //     value={field.state.value}
  //     onBlur={field.handleBlur}
  //     onChange={(e) => field.handleChange(e.target.value)}
  //     aria-invalid={isInvalid}
  //     placeholder={placeholder}
  //     autoComplete={autocomplete}
  //     type={type}
  //   />
  //   {isInvalid && <FieldError errors={field.state.meta.errors} />}
  // </Field>
  // );
}

export { SearchField };
