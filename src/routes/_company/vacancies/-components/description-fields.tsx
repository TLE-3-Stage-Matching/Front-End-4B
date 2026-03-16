import { FieldGroup } from "@/components/ui/field";
import type { VacancyForm } from "@/hooks/vacancy.form";

interface DescriptionFieldsProps {
  form: VacancyForm;
}

export function DescriptionFields({ form }: DescriptionFieldsProps) {
  return (
    <FieldGroup>
      <form.AppField
        name="description"
        children={(field) => (
          <field.DescriptionField
            label="Informatie over de stage"
            placeholder="Bijv. Wat maakt deze stage uniek? Waarom is dit leuk?"
          />
        )}
      />
      <form.AppField
        name="offer_text"
        children={(field) => (
          <field.DescriptionField
            label="Wat bieden wij?"
            placeholder="Bijv. Taken, arbeidsvoorwaarden, stagevergoeding"
          />
        )}
      />
      <form.AppField
        name="expectations_text"
        children={(field) => (
          <field.DescriptionField
            label="Wat verwachten we van jou?"
            placeholder="Bijv. Vereiste vaardigheden, taken, gewenste opleiding"
          />
        )}
      />
    </FieldGroup>
  );
}
