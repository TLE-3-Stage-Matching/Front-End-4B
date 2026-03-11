import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./context";
import {
  LinkField,
  TextAreaField,
  SearchListField,
  SelectedItemField,
  SearchLanguagesField,
  SelectedLanguageField,
  CompensationField,
  DistanceField,
  HoursField,
  SearchJobFunctionField,
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
      LinkField,
      TextAreaField,
      SearchListField,
      SelectedItemField,
      SearchLanguagesField,
      SelectedLanguageField,
      CompensationField,
      DistanceField,
      HoursField,
      SearchJobFunctionField,
    },
    formComponents: {},
  });
