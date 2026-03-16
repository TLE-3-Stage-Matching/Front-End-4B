import type { VacancyForm } from "@/hooks/vacancy.form";

interface TraitTagsFieldProps {
  form: VacancyForm;
}

export function TraitTagsField({ form }: TraitTagsFieldProps) {
  return (
    <form.AppField
      name="trait_tags"
      children={(field) => <field.TraitTagsField />}
    />
  );
}
