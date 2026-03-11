import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useFieldContext } from "@/hooks/context";
import type {
  Language,
  LanguageLevel,
  SkillQuality,
} from "@/types/user-profile";
import { Trash } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "../ui/badge";

/**
 * Renders a searchable combobox for selecting skills or qualities.
 * @param items - Available skills/qualities to select from
 * @param type - Type of items being selected ("Skill" or "Quality")
 * @returns Combobox field component
 */
function SearchListField({
  items,
  type,
}: {
  items: SkillQuality[];
  type: "Skill" | "Quality";
}) {
  const field = useFieldContext<SkillQuality[]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const typeLabels: Record<string, string> = {
    Skill: "Vaardigheid",
    Quality: "Eigenschap",
  };

  function handleSelect(skill: SkillQuality | null) {
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
        itemToStringLabel={(item: SkillQuality) => item.name}
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
          <ComboboxEmpty className="text-primary">
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

/**
 * Renders a selected skill/qualities with delete button and toggle switch.
 * @returns Selected item display component with controls
 */
function SelectedItemField() {
  const field = useFieldContext<SkillQuality>();
  const item = field.state.value;

  const handleDelete = () => {
    const form = field.form;
    const skillsField = form.getFieldValue("SkillQualities") as SkillQuality[];
    const updatedSkills = skillsField.filter((s) => s.id !== item.id);
    form.setFieldValue("SkillQualities", updatedSkills);
  };

  const handleToggle = (checked: boolean) => {
    field.handleChange({ ...item, toggle: checked });
  };

  return (
    <Badge>
      <FieldLabel htmlFor={item.name}>{item.name}</FieldLabel>
      <Button
        size="icon-xs"
        className="h-5 w-5 rounded-sm hover:bg-accent"
        onClick={handleDelete}
      >
        <Trash />
        <p className="sr-only">Verwijder</p>
      </Button>
      <Switch
        id={item.name}
        aria-label={item.name}
        checked={item.toggle || false}
        onCheckedChange={handleToggle}
      />
    </Badge>
  );
}

/**
 * Renders a searchable combobox for selecting languages.
 * @param languages - Available languages to select from
 * @returns Combobox field component for languages
 */
function SearchLanguagesField({ languages }: { languages: Language[] }) {
  const field = useFieldContext<Language[]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  function handleSelect(language: Language | null) {
    if (!language) {
      return;
    }

    const currentLanguage = field.state.value || [];

    // Check if skill already exists
    const skillExists = currentLanguage.some((s) => s.id === language.id);

    if (!skillExists) {
      field.handleChange([...currentLanguage, { ...language }]);
    }
  }

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Taal</FieldLabel>
      <Combobox
        items={languages}
        itemToStringLabel={(item: Language) => item.name}
        onValueChange={(value) => {
          handleSelect(value);
        }}
      >
        <ComboboxInput
          placeholder="selecteer een taal"
          id={field.name}
          name={field.name}
          onBlur={field.handleBlur}
          aria-invalid={isInvalid}
        />
        <ComboboxContent>
          <ComboboxEmpty>Geen taal gevonden</ComboboxEmpty>
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

/**
 * Renders a selected language with delete button and proficiency level selector.
 * @param levels - Available proficiency levels
 * @returns Selected language display component with controls
 */
function SelectedLanguageField({ levels }: { levels: LanguageLevel[] }) {
  const field = useFieldContext<Language>();
  const item = field.state.value;

  const defaultLevel = item.level?.id.toString() || levels[0].id.toString();

  if (!field.state.value.level) {
    field.handleChange({ ...field.state.value, level: levels[0] });
  }

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
        <SelectTrigger id={field.name} className="w-full max-w-20">
          <SelectValue
            id={field.name}
            aria-label="Taal niveau"
            placeholder="Selecteer een taal niveau"
          />
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

interface LinkFieldProps {
  label: string;
  placeholder?: string;
  icon: ReactNode;
}

/**
 * Renders a URL input field for GitHub.
 * @returns Input field component with https:// prefix and GitHub icon
 */
function LinkField({ label, placeholder, icon }: LinkFieldProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder={placeholder}
          autoComplete="url"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>{icon}</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

interface TextAreaFieldProps {
  label: string;
  placeholder?: string;
  maxCharacters: string;
}

function TextAreaField({
  label,
  placeholder,
  maxCharacters,
}: TextAreaFieldProps) {
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
          placeholder={placeholder}
          rows={5}
          className="min-h-12 resize-none"
          aria-invalid={isInvalid}
        />
        <InputGroupAddon align="block-end">
          <InputGroupText className="tabular-nums">
            {field.state.value.length}/{maxCharacters} karakters
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
export {
  LinkField,
  TextAreaField,
  SearchListField,
  SelectedItemField,
  SearchLanguagesField,
  SelectedLanguageField,
};
