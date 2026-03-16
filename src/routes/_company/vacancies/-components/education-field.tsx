import type { VacancyForm } from "@/hooks/vacancy.form";

interface EducationFieldProps {
  form: VacancyForm;
}

export function EducationField({ form }: EducationFieldProps) {
  return (
    <form.AppField
      name="education_tags"
      children={(field) => <field.EducationField />}
    />
  );
}
