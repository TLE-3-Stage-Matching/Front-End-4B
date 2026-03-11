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
import { ChevronDown, Trash } from "lucide-react";

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
          <SelectTrigger
            id={field.name}
            className="h-9 w-full appearance-none rounded-md border border-input bg-transparent py-2 pr-8 pl-3 text-sm shadow-xs transition-[color,box-shadow] outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
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

function TagsField() {
  const field = useFieldContext<any[]>();
  const form = field.form;
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  // Dummy tag list — will be replaced with GET /tags once API is functionaL
  const allTags = React.useMemo(
    () => [
      { id: 1, name: "React", tag_type: "skill" as const },
      { id: 2, name: "TypeScript", tag_type: "skill" as const },
      { id: 3, name: "Node.js", tag_type: "skill" as const },
      { id: 4, name: "Python", tag_type: "skill" as const },
      { id: 5, name: "SQL", tag_type: "skill" as const },
      { id: 6, name: "Leergierig", tag_type: "quality" as const },
      { id: 7, name: "Zelfstandig", tag_type: "quality" as const },
      { id: 8, name: "Teamspeler", tag_type: "quality" as const },
      { id: 9, name: "Communicatief", tag_type: "quality" as const },
      { id: 10, name: "Proactief", tag_type: "quality" as const },
    ],
    [],
  );

  const typeLabels: Record<string, string> = {
    skill: "Vaardigheid",
    quality: "Eigenschap",
  };

  const typeLabelPlural: Record<string, string> = {
    skill: "Vaardigheden",
    quality: "Eigenschappen",
  };

  const [search, setSearch] = React.useState("");
  const [input, setInput] = React.useState("");
  const [newType, setNewType] = React.useState<"skill" | "quality">("skill");

  const current: any[] = field.state.value || [];

  const visibleResults = allTags
    .filter(
      (tag) =>
        tag.name.toLowerCase().includes(search.trim().toLowerCase()) &&
        !current.some((t) => t.id === tag.id || t.name === tag.name),
    )
    .slice(0, 10);

  function addFromList(tag: { id: number; name: string; tag_type: string }) {
    const exists = current.some((t) => t.id === tag.id || t.name === tag.name);
    if (!exists) {
      form.setFieldValue(field.name, [
        ...current,
        { id: tag.id, name: tag.name, tag_type: tag.tag_type },
      ]);
    }
    // Close search only when no matches remain after adding
    const remaining = allTags.filter(
      (t) =>
        t.name.toLowerCase().includes(search.trim().toLowerCase()) &&
        t.id !== tag.id &&
        !current.some((c) => c.id === t.id || c.name === t.name),
    );
    if (remaining.length === 0) setSearch("");
  }

  function addNew() {
    const val = input.trim();
    if (!val) return;
    form.setFieldValue(field.name, [
      ...current,
      { name: val, tag_type: newType },
    ]);
    setInput("");
  }

  function removeTag(idx: number) {
    form.setFieldValue(
      field.name,
      current.filter((_, i) => i !== idx),
    );
  }

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={`${field.name}-search`}>
        Tags (vaardigheden / eigenschappen)
      </FieldLabel>

      {/* Added tags — split by type */}
      {(["skill", "quality"] as const).map((type) => {
        const group = current.filter((t: any) => t.tag_type === type);
        if (group.length === 0) return null;
        return (
          <div key={type} className="mb-2">
            <p className="mb-1 text-xs font-medium text-foreground">
              {typeLabelPlural[type]}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.map((t: any) => {
                const idx = current.indexOf(t);
                const variant = t?.tag_type === "skill" ? "skill" : "quality";
                return (
                  <Badge key={t.id ?? t.name ?? idx} variant={variant}>
                    {t.name}
                    <button
                      type="button"
                      className="ml-2"
                      onClick={() => removeTag(idx)}
                      aria-label="Verwijder"
                    >
                      <Trash className="size-3" />
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="flex flex-col gap-2">
        {/* Search existing tags */}
        <div className="relative">
          <Input
            id={`${field.name}-search`}
            placeholder="Zoek vaardigheid of eigenschap..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search.trim() && (
            <div className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border bg-background p-1 shadow-md">
              {visibleResults.length > 0 ? (
                visibleResults.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center justify-between gap-2 px-2 py-1 hover:bg-accent/20"
                  >
                    <Badge
                      variant={tag.tag_type === "skill" ? "skill" : "quality"}
                      className="truncate"
                    >
                      {tag.name}
                      <span className="ml-1 text-xs text-foreground/60">
                        ({typeLabels[tag.tag_type]})
                      </span>
                    </Badge>
                    <Button
                      type="button"
                      onClick={() => addFromList(tag)}
                      className="size-6 h-6 w-6 p-0"
                    >
                      +
                    </Button>
                  </div>
                ))
              ) : (
                <div className="px-2 py-1 text-sm text-muted-foreground">
                  Geen resultaten
                </div>
              )}
            </div>
          )}
        </div>

        {/* Create new tag inline */}
        <div className="flex gap-2">
          <Input
            id={`${field.name}-new`}
            placeholder="Nieuwe tag"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Select
            value={newType}
            onValueChange={(v) => setNewType(v as "skill" | "quality")}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="skill">Vaardigheid</SelectItem>
              <SelectItem value="quality">Eigenschap</SelectItem>
            </SelectContent>
          </Select>
          <Button type="button" onClick={addNew}>
            Voeg toe
          </Button>
        </div>
      </div>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

function EducationField() {
  const field = useFieldContext<any[]>();
  const form = field.form;
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  // Dummy education list (would come from API in the future)
  const educations = React.useMemo(
    () => [
      { id: 1, name: "HBO Informatica" },
      { id: 2, name: "MBO Software" },
      { id: 3, name: "WO Computer Science" },
      { id: 4, name: "HBO Marketing" },
    ],
    [],
  );

  const [input, setInput] = React.useState("");
  const [search, setSearch] = React.useState("");

  function addEducation() {
    const val = input.trim();
    const current = field.state.value || [];
    if (val) {
      const updated = [...current, { name: val, tag_type: "quality" }];
      form.setFieldValue(field.name, updated);
      setInput("");
      return;
    }
  }

  function addFromList(ed: { id: number; name: string }) {
    const current = field.state.value || [];
    const exists = current.some(
      (t: any) => t.id === ed.id || t.name === ed.name,
    );
    if (!exists) {
      const updated = [
        ...current,
        { id: ed.id, name: ed.name, tag_type: "quality" },
      ];
      form.setFieldValue(field.name, updated);
    }
    // Only close the search if the added item was the only visible result
    const addedIds = new Set(
      [...current, { id: ed.id, name: ed.name }]
        .map((t: any) => t.id)
        .filter(Boolean),
    );
    const addedNames = new Set(
      [...current, { id: ed.id, name: ed.name }]
        .map((t: any) => t.name)
        .filter(Boolean),
    );
    const remainingMatches = educations.filter(
      (e) =>
        e.name.toLowerCase().includes(search.trim().toLowerCase()) &&
        !addedIds.has(e.id) &&
        !addedNames.has(e.name),
    );
    if (remainingMatches.length === 0) {
      setSearch("");
    }
  }

  function removeEducation(idx: number) {
    const current = field.state.value || [];
    const updated = current.filter((_, i) => i !== idx);
    form.setFieldValue(field.name, updated);
  }

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Opleidingen</FieldLabel>
      <div className="mb-2 flex flex-wrap gap-2">
        {(field.state.value || []).map((t: any, i: number) => {
          const variant = t?.tag_type === "skill" ? "skill" : "quality";
          return (
            <Badge key={t.id ?? t.name ?? i} variant={variant}>
              {typeof t === "string" ? t : t.name}
              <button
                className="ml-2"
                onClick={() => removeEducation(i)}
                aria-label="Verwijder"
              >
                <Trash />
              </button>
            </Badge>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <div className="relative">
          <Input
            id={`${field.name}-search`}
            placeholder="Zoek opleiding..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search.trim() && (
            <div className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border bg-background p-1 shadow-md">
              {educations
                .filter(
                  (ed) =>
                    ed.name
                      .toLowerCase()
                      .includes(search.trim().toLowerCase()) &&
                    !(field.state.value || []).some(
                      (t: any) => t.id === ed.id || t.name === ed.name,
                    ),
                )
                .slice(0, 10)
                .map((ed) => (
                  <div
                    key={ed.id}
                    className="flex items-center justify-between gap-2 px-2 py-1 hover:bg-accent/20"
                  >
                    <span className="truncate">{ed.name}</span>
                    <Button
                      type="button"
                      onClick={() => addFromList(ed)}
                      className="size-6 h-6 w-6 p-0"
                    >
                      +
                    </Button>
                  </div>
                ))}
              {educations.filter(
                (ed) =>
                  ed.name.toLowerCase().includes(search.trim().toLowerCase()) &&
                  !(field.state.value || []).some(
                    (t: any) => t.id === ed.id || t.name === ed.name,
                  ),
              ).length === 0 && (
                <div className="px-2 py-1 text-sm text-muted-foreground">
                  Geen resultaten
                </div>
              )}
            </div>
          )}
        </div>

        <Input
          id={`${field.name}-new-education`}
          placeholder="Nieuwe opleiding"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button type="button" onClick={addEducation}>
          Voeg toe
        </Button>
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

export { TitleField, HoursSelect, TagsField, DescriptionField, EducationField };
