import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./context";
import {
  SelectedItemField,
  SearchListField,
} from "@/components/form/user-profile";

export const { useAppForm: useUserProfileForm, withForm: withUserProfileForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      SearchListField,
      SelectedItemField,
    },
    formComponents: {},
  });
