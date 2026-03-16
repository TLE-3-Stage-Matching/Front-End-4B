import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./context";
import {
  TitleField,
  HoursSelect,
  SkillTagsField,
  TraitTagsField,
  DescriptionField,
  EducationField,
} from "@/components/form/vacancy";

export const { useAppForm: useVacancyForm, withForm: withVacancyForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      TitleField,
      HoursSelect,
      SkillTagsField,
      TraitTagsField,
      DescriptionField,
      EducationField,
    },
    formComponents: {},
  });

export type VacancyFormValues = {
  title: string;
  hours_per_week: number | undefined;
  skill_tags: { id: number; name: string }[];
  trait_tags: { id: number; name: string }[];
  education_tags: { id: number; name: string }[];
  description: string;
  offer_text: string;
  expectations_text: string;
};

function _vacancyFormType(values: VacancyFormValues) {
  return useVacancyForm({ defaultValues: values, onSubmit: async () => {} });
}
export type VacancyForm = ReturnType<typeof _vacancyFormType>;
