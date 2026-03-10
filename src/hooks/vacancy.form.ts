import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./context";
import {
  TitleField,
  HoursSelect,
  TagsField,
  DescriptionField,
} from "@/components/form/vacancy";

export const { useAppForm: useVacancyForm, withForm: withVacancyForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      TitleField,
      HoursSelect,
      TagsField,
      DescriptionField,
    },
    formComponents: {},
  });
