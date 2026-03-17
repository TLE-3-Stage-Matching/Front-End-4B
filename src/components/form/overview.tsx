import { useFieldContext } from "@/hooks/context.ts";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group.tsx";
import { Search } from "lucide-react";

function SearchField({
  placeholder = "Zoek student",
  autocomplete = "off",
  type = "text",
}: InputFieldProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <InputGroup className="my-2 bg-card">
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

export { SearchField };
