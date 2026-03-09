import { createFormHook } from "@tanstack/react-form";
import { NameField } from "@/components/form/login";
import { fieldContext, formContext } from "./context";

export const { useAppForm: useLoginForm, withForm: withLoginForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      NameField,
    },
    formComponents: {},
  });
