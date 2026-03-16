import { FieldGroup } from "@/components/ui/field";
import type { VacancyForm } from "@/hooks/vacancy.form";

interface BasicInfoProps {
  form: VacancyForm;
}

export function BasicInfo({ form }: BasicInfoProps) {
  return (
    <FieldGroup>
      <form.AppField name="title" children={(field) => <field.TitleField />} />
      <form.AppField
        name="hours_per_week"
        children={(field) => <field.HoursSelect />}
      />
    </FieldGroup>
  );
}
