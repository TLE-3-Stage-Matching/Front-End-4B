import { fieldContext, formContext } from "./context";
import { createFormHook } from "@tanstack/react-form";
import { SearchField, FilterField } from "@/components/form/overview";

export const { useAppForm: useOverviewForm, withForm: withOverviewForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      SearchField,
      FilterField,
    },
    formComponents: {},
  });
