import { fieldContext, formContext } from "./context";
import { createFormHook } from "@tanstack/react-form";
import { InputField } from "@/components/form/shared";

export const { useAppForm: useLoginForm, withForm: withLoginForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
  },
  formComponents: {},
});
