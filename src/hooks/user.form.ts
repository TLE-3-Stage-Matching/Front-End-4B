import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { NameField } from "@/components/form/login";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm: useLoginForm, withForm: withLoginForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      NameField,
    },
    formComponents: {},
  });
