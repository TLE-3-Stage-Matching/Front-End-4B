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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useFieldContext } from "@/hooks/context";
import type {
  JobFunction,
  Language,
  LanguageLevel,
  SkillQuality,
} from "@/types/user-profile";
import { Trash, Github, Linkedin, Globe } from "lucide-react";
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

/**
 * Renders a text input field for ZIP code.
 * @returns Input field component
 */
function ZIPCodeField({}: {}) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Postcode</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder="1234 AZ"
        autoComplete="off"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

/**
 * Renders a text input field for first name.
 * @returns Input field component
 */
function FirstNameField({}: {}) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Voornaam</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder="Jan"
        autoComplete="given-name"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

/**
 * Renders a text input field for infix (tussenvoegsel).
 * @returns Input field component
 */
function InfixField({}: {}) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Tussenvoegsel</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder="van"
        autoComplete="additional-name"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

/**
 * Renders a text input field for last name.
 * @returns Input field component
 */
function LastNameField({}: {}) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Achternaam</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder="Jansen"
        autoComplete="family-name"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

/**
 * Renders a URL input field for GitHub.
 * @returns Input field component with https:// prefix and GitHub icon
 */
function GitHubLinkField({}: {}) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>GitHub</FieldLabel>
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
          placeholder="github.com/gebruikersnaam"
          autoComplete="url"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>
            <Github />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

/**
 * Renders a URL input field for LinkedIn.
 * @returns Input field component with https:// prefix and LinkedIn icon
 */
function LinkedInLinkField({}: {}) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>LinkedIn</FieldLabel>
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
          placeholder="linkedin.com/in/gebruikersnaam"
          autoComplete="url"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>
            <Linkedin />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

/**
 * Renders a URL input field for Website.
 * @returns Input field component with https:// prefix and Globe icon
 */
function WebsiteLinkField({}: {}) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Website</FieldLabel>
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
          placeholder="mijn-website.com"
          autoComplete="url"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>
            <Globe />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

/**
 * Renders a text field
 * @returns Text field with maxium character counter
 */
function AboutField() {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Over Mij</FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          placeholder="Informatie over jezelf"
          rows={5}
          className="min-h-12 resize-none"
          aria-invalid={isInvalid}
        />
        <InputGroupAddon align="block-end">
          <InputGroupText className="tabular-nums">
            {field.state.value.length}/XX karakters
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
          placeholder="selecteer een functie"
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
 * Renders a select dropdown for choosing work hours.
 * @returns Select field component with predefined hour options (10, 20, 30, 40)
 */
function HoursField() {
  const field = useFieldContext<number>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const handleValueChange = (value: string) => {
    field.handleChange(parseInt(value));
  };

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>Uren</FieldLabel>
      <Select
        value={field.state.value.toString()}
        onValueChange={handleValueChange}
      >
        <SelectTrigger id={field.name} className="w-[180px]">
          <SelectValue placeholder="10 uur" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10 Uur</SelectItem>
          <SelectItem value="20">20 Uur</SelectItem>
          <SelectItem value="30">30 Uur</SelectItem>
          <SelectItem value="40">40 Uur</SelectItem>
        </SelectContent>
      </Select>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

/**
 * Renders a slider for selecting maximum distance in kilometers.
 * @returns Slider field component with range 1-100 km and current value display
 */
function DistanceField() {
  const field = useFieldContext<number>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const handleValueChange = (values: number[]) => {
    field.handleChange(values[0]);
  };

  return (
    <Field>
      <div className="flex items-center justify-between">
        <FieldLabel id={field.name} htmlFor={field.name}>
          Afstand in Km
        </FieldLabel>
        <FieldDescription className="text-sm font-medium">
          {field.state.value} km
        </FieldDescription>
      </div>
      <Slider
        id={field.name}
        value={[field.state.value]}
        onValueChange={handleValueChange}
        min={1}
        max={100}
        aria-labelledby={field.name}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
/**
 * Renders a slider for selecting hourly compensation in euros.
 * @returns Slider field component with range €1-€100 and current value display
 */
function CompensationField() {
  const field = useFieldContext<number>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const handleValueChange = (values: number[]) => {
    field.handleChange(values[0]);
  };

  return (
    <Field>
      <div className="flex items-center justify-between">
        <FieldLabel id={field.name} htmlFor={field.name}>
          Euro per uur
        </FieldLabel>
        <FieldDescription className="text-sm font-medium">
          €{field.state.value}
        </FieldDescription>
      </div>
      <Slider
        id={field.name}
        value={[field.state.value]}
        onValueChange={handleValueChange}
        min={1}
        max={100}
        aria-labelledby={field.name}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

export {
  ZIPCodeField,
  FirstNameField,
  InfixField,
  LastNameField,
  GitHubLinkField,
  LinkedInLinkField,
  WebsiteLinkField,
  SearchListField,
  AboutField,
  SelectedItemField,
  SearchLanguagesField,
  SelectedLanguageField,
  SearchJobFunctionField,
  HoursField,
  DistanceField,
  CompensationField,
};
