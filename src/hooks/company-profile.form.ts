import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./context";
import { InputField, SelectField } from "@/components/form/shared";
import {
  TextareaField,
  IndustrySelectField,
} from "@/components/form/company-profile";

export const {
  useAppForm: useCompanyProfileForm,
  withForm: withCompanyProfileForm,
} = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    SelectField,
    TextareaField,
    IndustrySelectField,
  },
  formComponents: {},
});
