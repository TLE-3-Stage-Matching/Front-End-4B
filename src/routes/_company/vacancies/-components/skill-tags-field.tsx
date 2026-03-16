import type { VacancyForm } from "@/hooks/vacancy.form";

interface SkillTagsFieldProps {
  form: VacancyForm;
}

export function SkillTagsField({ form }: SkillTagsFieldProps) {
  return (
    <form.AppField
      name="skill_tags"
      children={(field) => <field.SkillTagsField />}
    />
  );
}
