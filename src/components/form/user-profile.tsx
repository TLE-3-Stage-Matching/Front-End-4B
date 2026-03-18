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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useFieldContext } from "@/hooks/context";
import type {
  JobFunction,
  Language,
  LanguageLevel,
  SkillQuality,
} from "@/types/user-profile";
import { Trash } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";

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
      field.handleChange([
        ...currentSkillProps,
        {
          ...skill,
          toggle: false,
          tag_type: type === "Skill" ? "skill" : "quality",
        },
      ]);
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
                <Badge variant={type === "Skill" ? "skill" : "quality"}>
                  {item.name}
                </Badge>
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
    <Badge variant={item?.tag_type === "skill" ? "skill" : "quality"}>
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

    // Check if language already exists
    const languageExists = currentLanguage.some((s) => s.id === language.id);

    if (!languageExists) {
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
          placeholder="Selecteer een taal"
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
    <Badge>
      <FieldLabel htmlFor={field.name}>{item.name}</FieldLabel>
      <Button
        size="icon-sm"
        className="h-5 w-5 rounded-sm hover:bg-accent"
        onClick={handleDelete}
      >
        <Trash />
        <p className="sr-only">Verwijder</p>
      </Button>
      <Select onValueChange={handleSubmit} value={defaultLevel}>
        <SelectTrigger
          id={field.name}
          className="h-6! w-full max-w-20 rounded-full pr-1 pl-2"
          size="sm"
        >
          <SelectValue
            id={field.name}
            aria-label="Taal niveau"
            placeholder="Selecteer een taal niveau"
          />
        </SelectTrigger>
        <SelectContent className="w-18 max-w-18 min-w-18 rounded-xl">
          {levels.map((level) => (
            <SelectItem
              key={level.id}
              value={level.id.toString()}
              className="h-6 rounded-full"
            >
              {level.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Badge>
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
 * @deprecated
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
  rows?: number;
}

function TextAreaField({
  label,
  placeholder,
  maxCharacters,
  rows = 5,
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
          rows={rows}
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

/**
 * Renders a searchable combobox for selecting functions.
 * @param functions - Available functions to select from
 * @returns Combobox field component for functions
 */
function SearchJobFunctionField({
  jobFunctions,
}: {
  jobFunctions: JobFunction[];
}) {
  const field = useFieldContext<JobFunction>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  function handleSelect(jobFunction: JobFunction | null) {
    if (!jobFunction) {
      return;
    }

    field.handleChange(jobFunction);
  }

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Functie</FieldLabel>
      <Combobox
        items={jobFunctions}
        itemToStringLabel={(item: JobFunction) => item.name}
        onValueChange={(value) => {
          handleSelect(value);
        }}
      >
        <ComboboxInput
          placeholder="Selecteer een functie"
          id={field.name}
          name={field.name}
          onBlur={field.handleBlur}
          aria-invalid={isInvalid}
        />
        <ComboboxContent>
          <ComboboxEmpty>Geen functie gevonden</ComboboxEmpty>
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
 * Renders a range slider for selecting minimum and maximum work hours per week.
 * Bound to a single `[min, max]` tuple field to avoid stale cross-field reads.
 */
function HoursRangeField() {
  const field = useFieldContext<[number, number]>();

  const subErrors = [
    ...(field.form.state.fieldMeta[`${field.name}[0]`]?.errors ?? []),
    ...(field.form.state.fieldMeta[`${field.name}[1]`]?.errors ?? []),
  ];
  const hasTried =
    field.state.meta.isTouched || field.form.state.submissionAttempts > 0;
  const isInvalid =
    hasTried && (!field.state.meta.isValid || subErrors.length > 0);
  const allErrors = [...field.state.meta.errors, ...subErrors];

  const [minVal, maxVal] = field.state.value;

  return (
    <Field data-invalid={isInvalid}>
      <div className="flex items-center justify-between">
        <FieldLabel id={field.name} htmlFor={field.name}>
          Uren per week
        </FieldLabel>
        <FieldDescription className="text-sm font-medium">
          {minVal === 1 && maxVal === 1
            ? "Geen voorkeur"
            : `${minVal} – ${maxVal} uren`}
        </FieldDescription>
      </div>
      <Slider
        id={field.name}
        value={[minVal, maxVal]}
        onValueChange={(values) => field.handleChange([values[0], values[1]])}
        min={1}
        max={40}
        aria-labelledby={field.name}
      />
      {isInvalid && <FieldError errors={allErrors} />}
    </Field>
  );
}

/**
 * Renders a reusable slider field for a single numeric value.
 */
function SliderField({
  label,
  min,
  max,
  unit,
}: {
  label: string;
  min: number;
  max: number;
  unit?: string;
}) {
  const field = useFieldContext<number>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const handleValueChange = (values: number[]) => {
    field.handleChange(values[0]);
  };

  const valueLabel =
    field.state.value === min
      ? "Geen voorkeur"
      : unit
        ? `${field.state.value} ${unit}`
        : `${field.state.value}`;

  return (
    <Field>
      <div className="flex items-center justify-between">
        <FieldLabel id={field.name} htmlFor={field.name}>
          {label}
        </FieldLabel>
        <FieldDescription className="text-sm font-medium">
          {valueLabel}
        </FieldDescription>
      </div>
      <Slider
        id={field.name}
        value={[field.state.value]}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        aria-labelledby={field.name}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

/**
 * Renders a checkbox for indicating whether the student has a driver's license.
 */
function DriversLicenseField() {
  const field = useFieldContext<boolean>();

  return (
    <Field>
      <div className="flex items-center gap-2">
        <Checkbox
          id={field.name}
          checked={field.state.value}
          onCheckedChange={(checked) => field.handleChange(checked === true)}
        />
        <FieldLabel htmlFor={field.name}>Rijbewijs</FieldLabel>
      </div>
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
  SearchJobFunctionField,
  HoursRangeField,
  SliderField,
  DriversLicenseField,
};
