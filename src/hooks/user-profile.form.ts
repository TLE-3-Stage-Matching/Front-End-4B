import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./context";
import {
  TextAreaField,
  SearchListField,
  SelectedItemField,
  SearchLanguagesField,
  SelectedLanguageField,
  SliderField,
  HoursRangeField,
  SearchJobFunctionField,
  DriversLicenseField,
  DateField,
} from "@/components/form/user-profile";
import { InputField } from "@/components/form/shared";

/*
 * Form hook for the user profile
 */
export const { useAppForm: useUserProfileForm, withForm: withUserProfileForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      InputField,
      TextAreaField,
      SearchListField,
      SelectedItemField,
      SearchLanguagesField,
      SelectedLanguageField,
      SliderField,
      HoursRangeField,
      SearchJobFunctionField,
      DriversLicenseField,
      DateField,
    },
    formComponents: {},
  });
