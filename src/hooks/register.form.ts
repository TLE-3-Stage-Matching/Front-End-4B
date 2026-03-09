import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { NameField, EmailField } from "@/components/form/register";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm: useRegisterForm, withForm: withRegisterForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      NameField,
      EmailField,
    },
    formComponents: {},
  });
