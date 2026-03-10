import { fieldContext, formContext } from "./context";
import { createFormHook } from "@tanstack/react-form";
import { PasswordField, EmailField } from "@/components/form/login";

export const { useAppForm: useLoginForm, withForm: withLoginForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      PasswordField,
      EmailField,
    },
    formComponents: {},
  });
