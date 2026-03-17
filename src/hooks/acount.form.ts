import { fieldContext, formContext } from "./context";
import { createFormHook } from "@tanstack/react-form";
import { InputField } from "@/components/form/shared";

export const { useAppForm: useAccountForm, withForm: withAccountForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      InputField,
    },
    formComponents: {},
  });
