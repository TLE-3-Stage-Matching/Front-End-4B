import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { InputField, SelectField } from "@/components/form/shared";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm: useRegisterForm, withForm: withRegisterForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      InputField,
      SelectField,
    },
    formComponents: {},
  });
