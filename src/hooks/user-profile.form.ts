import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./context";
import {
  SelectedItemField,
  SearchListField,
  SearchLanguagesField,
} from "@/components/form/user-profile";

/* 
* Form hook for the user profile
*/
export const { useAppForm: useUserProfileForm, withForm: withUserProfileForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      SearchListField,
      SelectedItemField,
      SearchLanguagesField,
    },
    formComponents: {},
  });
