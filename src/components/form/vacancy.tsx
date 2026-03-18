import React from "react";
import { useQuery } from "@tanstack/react-query";
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
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Plus, Trash, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type VacTag = { id: number; name: string };

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
      <FieldLabel htmlFor={field.name} id={`${field.name}-label`}>
        Uren per week
      </FieldLabel>
      <div className="relative w-fit">
        <Select
          value={field.state.value ? String(field.state.value) : undefined}
          onValueChange={(val) =>
            field.handleChange(val ? Number(val) : undefined)
          }
          aria-labelledby={`${field.name}-label`}
        >
          <SelectTrigger id={field.name} className="w-full">
            <SelectValue placeholder="Kies uren" />
          </SelectTrigger>

          <SelectContent>
            {[8, 16, 24, 32, 36, 40].map((h) => (
              <SelectItem
                key={h}
                value={String(h)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    const target = e.currentTarget as HTMLElement;
                    target.click();
                    e.preventDefault();
                  }
                }}
              >
                {h} uur
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Field>
  );
}

/* SkillTagsField */
function SkillTagsField() {
  const field = useFieldContext<VacTag[]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const [showAddNew, setShowAddNew] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const newTagCounter = React.useRef(-1);

  const { data } = useQuery<{ data: VacTag[] }>({
    queryKey: ["/api/tags?tag_type=skill"],
  });

  // Filter out tags already selected so user can't add duplicates
  const current = field.state.value ?? [];
  const items = (data?.data ?? []).filter(
    (t) => !current.some((c) => c.id === t.id),
  );

  function handleSelect(tag: VacTag | null) {
    // Add selected tag to the current list
    if (!tag) return;
    if (!current.some((c) => c.id === tag.id)) {
      field.handleChange([...current, { id: tag.id, name: tag.name }]);
    }
  }

  function removeTag(id: number) {
    field.handleChange(current.filter((t) => t.id !== id));
  }

  function addNewTag() {
    const trimmed = newName.trim();
    if (!trimmed) return;
    if (current.some((t) => t.name.toLowerCase() === trimmed.toLowerCase()))
      return;
    const id = newTagCounter.current--;
    field.handleChange([...current, { id, name: trimmed }]);
    setNewName("");
    setShowAddNew(false);
  }

  return (
    <Field data-invalid={isInvalid}>
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor={field.name} className="mb-0">
          Vaardigheden
        </FieldLabel>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => {
                setShowAddNew((v) => !v);
                setNewName("");
              }}
              aria-label={
                showAddNew
                  ? "Annuleer nieuwe vaardigheid"
                  : "Nieuwe vaardigheid toevoegen"
              }
              className="rounded p-0.5 text-foreground hover:bg-accent/20"
            >
              {showAddNew ? (
                <X className="size-4" />
              ) : (
                <Plus className="size-4" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            className="bg-accent text-card"
            arrowClassName="bg-accent fill-accent"
          >
            {showAddNew ? "Annuleren" : "Nieuwe vaardigheid aanmaken"}
          </TooltipContent>
        </Tooltip>
      </div>
      {showAddNew && (
        <div className="flex gap-2">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addNewTag();
              }
            }}
            placeholder="Nieuwe vaardigheid"
            autoFocus
          />
          <Button type="button" onClick={addNewTag} size="sm">
            Toevoegen
          </Button>
        </div>
      )}
      <div className="mb-2 flex flex-wrap gap-2">
        {current.map((t) => (
          <Badge key={t.id} variant="skill" className="pr-2!">
            {t.name}
            <button
              type="button"
              className="ml-2"
              onClick={() => removeTag(t.id)}
              aria-label="Verwijder"
            >
              <Trash className="size-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Combobox
        items={items}
        itemToStringLabel={(item: VacTag) => item.name}
        onValueChange={handleSelect}
      >
        <ComboboxInput
          placeholder="Selecteer een vaardigheid"
          id={field.name}
          name={field.name}
          onBlur={field.handleBlur}
          aria-invalid={isInvalid}
        />
        <ComboboxContent>
          <ComboboxEmpty>Geen vaardigheid gevonden</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item}>
                <Badge variant="skill">{item.name}</Badge>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

/* TraitTagsField */
function TraitTagsField() {
  const field = useFieldContext<VacTag[]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const [showAddNew, setShowAddNew] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const newTagCounter = React.useRef(-1);

  const { data } = useQuery<{ data: VacTag[] }>({
    queryKey: ["/api/tags?tag_type=trait"],
  });

  const current = field.state.value ?? [];
  const items = (data?.data ?? []).filter(
    (t) => !current.some((c) => c.id === t.id),
  );

  function handleSelect(tag: VacTag | null) {
    if (!tag) return;
    if (!current.some((c) => c.id === tag.id)) {
      field.handleChange([...current, { id: tag.id, name: tag.name }]);
    }
  }

  function removeTag(id: number) {
    field.handleChange(current.filter((t) => t.id !== id));
  }

  function addNewTag() {
    const trimmed = newName.trim();
    if (!trimmed) return;
    if (current.some((t) => t.name.toLowerCase() === trimmed.toLowerCase()))
      return;
    const id = newTagCounter.current--;
    field.handleChange([...current, { id, name: trimmed }]);
    setNewName("");
    setShowAddNew(false);
  }

  return (
    <Field data-invalid={isInvalid}>
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor={field.name} className="mb-0">
          Eigenschappen
        </FieldLabel>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => {
                setShowAddNew((v) => !v);
                setNewName("");
              }}
              aria-label={
                showAddNew
                  ? "Annuleer nieuwe eigenschap"
                  : "Nieuwe eigenschap toevoegen"
              }
              className="rounded p-0.5 text-foreground hover:bg-accent/20"
            >
              {showAddNew ? (
                <X className="size-4" />
              ) : (
                <Plus className="size-4" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            className="bg-accent text-card"
            arrowClassName="bg-accent fill-accent"
          >
            {showAddNew ? "Annuleren" : "Nieuwe eigenschap aanmaken"}
          </TooltipContent>
        </Tooltip>
      </div>
      {showAddNew && (
        <div className="flex gap-2">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addNewTag();
              }
            }}
            placeholder="Nieuwe eigenschap"
            autoFocus
          />
          <Button type="button" onClick={addNewTag} size="sm">
            Toevoegen
          </Button>
        </div>
      )}
      <div className="mb-2 flex flex-wrap gap-2">
        {current.map((t) => (
          <Badge key={t.id} variant="quality" className="pr-2!">
            {t.name}
            <button
              type="button"
              className="ml-2"
              onClick={() => removeTag(t.id)}
              aria-label="Verwijder"
            >
              <Trash className="size-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Combobox
        items={items}
        itemToStringLabel={(item: VacTag) => item.name}
        onValueChange={handleSelect}
      >
        <ComboboxInput
          placeholder="Selecteer een eigenschap"
          id={field.name}
          name={field.name}
          onBlur={field.handleBlur}
          aria-invalid={isInvalid}
        />
        <ComboboxContent>
          <ComboboxEmpty>Geen eigenschap gevonden</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item}>
                <Badge variant="quality">{item.name}</Badge>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

function EducationField() {
  const field = useFieldContext<VacTag[]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const [showAddNew, setShowAddNew] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const newTagCounter = React.useRef(-1);

  const { data } = useQuery<{ data: VacTag[] }>({
    queryKey: ["/api/tags?tag_type=major"],
  });

  const current = field.state.value ?? [];
  const items = (data?.data ?? []).filter(
    (t) => !current.some((c) => c.id === t.id),
  );

  function handleSelect(tag: VacTag | null) {
    if (!tag) return;
    if (!current.some((c) => c.id === tag.id)) {
      field.handleChange([...current, { id: tag.id, name: tag.name }]);
    }
  }

  function removeEducation(id: number) {
    field.handleChange(current.filter((t) => t.id !== id));
  }

  function addNewEducation() {
    const trimmed = newName.trim();
    if (!trimmed) return;
    if (current.some((t) => t.name.toLowerCase() === trimmed.toLowerCase()))
      return;
    const id = newTagCounter.current--;
    field.handleChange([...current, { id, name: trimmed }]);
    setNewName("");
    setShowAddNew(false);
  }

  return (
    <Field data-invalid={isInvalid}>
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor={field.name} className="mb-0">
          Opleidingen
        </FieldLabel>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => {
                setShowAddNew((v) => !v);
                setNewName("");
              }}
              aria-label={
                showAddNew
                  ? "Annuleer nieuwe opleiding"
                  : "Nieuwe opleiding toevoegen"
              }
              className="rounded p-0.5 text-foreground hover:bg-accent/20"
            >
              {showAddNew ? (
                <X className="size-4" />
              ) : (
                <Plus className="size-4" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            className="bg-accent text-card"
            arrowClassName="bg-accent fill-accent"
          >
            {showAddNew ? "Annuleren" : "Nieuwe opleiding aanmaken"}
          </TooltipContent>
        </Tooltip>
      </div>

      {showAddNew && (
        <div className="flex gap-2">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addNewEducation();
              }
            }}
            placeholder="Nieuwe opleiding"
            autoFocus
          />
          <Button type="button" onClick={addNewEducation} size="sm">
            Toevoegen
          </Button>
        </div>
      )}

      <div className="mb-2 flex flex-wrap gap-2">
        {current.map((t) => (
          <Badge key={t.id} variant="quality">
            {t.name}
            <button
              type="button"
              className="ml-2"
              onClick={() => removeEducation(t.id)}
              aria-label="Verwijder"
            >
              <Trash className="size-3" />
            </button>
          </Badge>
        ))}
      </div>

      <Combobox
        items={items}
        itemToStringLabel={(item: VacTag) => item.name}
        onValueChange={handleSelect}
      >
        <ComboboxInput
          placeholder="Selecteer een opleiding"
          id={field.name}
          name={field.name}
          onBlur={field.handleBlur}
          aria-invalid={isInvalid}
        />
        <ComboboxContent>
          <ComboboxEmpty>Geen opleiding gevonden</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item}>
                <Badge variant="quality">{item.name}</Badge>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

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

export {
  TitleField,
  HoursSelect,
  SkillTagsField,
  TraitTagsField,
  DescriptionField,
  EducationField,
};
