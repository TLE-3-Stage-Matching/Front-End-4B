import { fieldContext, formContext } from "./context";
import { createFormHook } from "@tanstack/react-form";
import { SearchField } from "@/components/form/overview";

export const { useAppForm: useOverviewForm, withForm: withOverviewForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      SearchField,
    },
    formComponents: {},
  });
