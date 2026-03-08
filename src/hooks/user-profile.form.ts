import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./context";
import {
  SelectedItemField,
  SearchListField,
  SearchLanguagesField,
  ZIPCodeField,
  FirstNameField,
  InfixField,
  LastNameField,
  GitHubLinkField,
  LinkedInLinkField,
  WebsiteLinkField,
  AboutField,
} from "@/components/form/user-profile";

/*
 * Form hook for the user profile
 */
export const { useAppForm: useUserProfileForm, withForm: withUserProfileForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      ZIPCodeField,
      FirstNameField,
      InfixField,
      LastNameField,
      GitHubLinkField,
      LinkedInLinkField,
      WebsiteLinkField,
      SearchListField,
      SelectedItemField,
      SearchLanguagesField,
      AboutField,
    },
    formComponents: {},
  });
