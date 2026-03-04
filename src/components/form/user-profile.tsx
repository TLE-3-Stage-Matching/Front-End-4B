import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useFieldContext } from "@/hooks/context";
import type { Language, LanguageLevel, SkillProp } from "@/types/user-profile";
import { Trash } from "lucide-react";

function SearchListField({
  items,
  type,
}: {
  items: SkillProp[];
  type: "Skill" | "Property" | "Language";
}) {
  const field = useFieldContext<SkillProp[] | Language[]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const typeLabels: Record<string, string> = {
    Skill: "Vaardigheid",
    Property: "Eigenschap",
    Language: "Taal",
  };

  function handleSelect(skill: SkillProp | Language | null) {
    if (!skill) {
      return;
    }

    const currentSkillProps = field.state.value || [];

    // Check if skill already exists
    const skillExists = currentSkillProps.some((s) => s.id === skill.id);

    if (!skillExists) {
      field.handleChange([...currentSkillProps, { ...skill, toggle: false }]);
    }
  }

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{typeLabels[type]}</FieldLabel>
      <Combobox
        items={items}
        itemToStringLabel={(item: SkillProp) => item.name}
        onValueChange={(value) => {
          handleSelect(value);
        }}
      >
        <ComboboxInput
          placeholder={`selecteer een ${typeLabels[type].toLowerCase()}`}
          id={field.name}
          name={field.name}
          onBlur={field.handleBlur}
          aria-invalid={isInvalid}
        />
        <ComboboxContent>
          <ComboboxEmpty>
            Geen {typeLabels[type].toLowerCase()} gevonden
          </ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item}>
                {item.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

function SelectedItemField({ type }: { type: "skills" | "properties" }) {
  const field = useFieldContext<SkillProp>();
  const item = field.state.value;

  const handleDelete = () => {
    const form = field.form;
    const skillsField = form.getFieldValue(type) as SkillProp[];
    const updatedSkills = skillsField.filter((s) => s.id !== item.id);
    form.setFieldValue(type, updatedSkills);
  };

  const handleToggle = (checked: boolean) => {
    field.handleChange({ ...item, toggle: checked });
  };

  return (
    <div className="flex w-fit items-center justify-center gap-1 rounded-r-xl bg-primary py-1 pr-1 pl-2 text-primary-foreground">
      <FieldLabel htmlFor={item.name}>{item.name}</FieldLabel>
      <Button
        size="icon-xs"
        className="h-5 w-5 rounded-sm hover:bg-secondary"
        onClick={handleDelete}
      >
        <Trash />
        <p className="sr-only">Verwijder</p>
      </Button>
      <Switch checked={item.toggle || false} onCheckedChange={handleToggle} />
    </div>
  );
}

function SelectedLanguageField({ levels }: { levels: LanguageLevel[] }) {
  const field = useFieldContext<Language>();
  const item = field.state.value;

  const handleDelete = () => {
    const form = field.form;
    const skillsField = form.getFieldValue("languages") as Language[];
    const updatedSkills = skillsField.filter((s) => s.id !== item.id);
    form.setFieldValue("languages", updatedSkills);
  };

  const handleSubmit = (levelId: string) => {
    const level = levels.find((l) => l.id.toString() === levelId);
    if (level) {
      field.handleChange({ ...item, level: level });
    }
  };

  const defaultLevel = item.level?.id.toString() || levels[0]?.id.toString();

  return (
    <div className="flex w-fit items-center justify-center gap-1 rounded-r-xl bg-primary py-1 pr-1 pl-2 text-primary-foreground">
      <FieldLabel htmlFor={field.name}>{item.name}</FieldLabel>
      <Button
        size="icon-sm"
        className="rounded-sm hover:bg-secondary"
        onClick={handleDelete}
      >
        <Trash />
        <p className="sr-only">Verwijder</p>
      </Button>
      <Select onValueChange={handleSubmit} value={defaultLevel}>
        <SelectTrigger className="w-full max-w-20">
          <SelectValue placeholder="Select a proficiency level" />
        </SelectTrigger>
        <SelectContent className="w-18 max-w-18 min-w-18">
          {levels.map((level) => (
            <SelectItem key={level.id} value={level.id.toString()}>
              {level.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function ZIPCodeField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder="name"
        autoComplete="off"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

export {
  ZIPCodeField,
  SelectedItemField,
  SearchListField,
  SelectedLanguageField,
};
