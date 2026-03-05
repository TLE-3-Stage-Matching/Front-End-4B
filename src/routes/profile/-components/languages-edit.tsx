import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { SelectedLanguageField } from "@/components/form/user-profile";
import { SquarePen } from "lucide-react";
import { useUserProfileForm } from "@/hooks/user-profile.form";
import { SelectedLanguagesSchema, type Language } from "@/types/user-profile";

function LanguagesEdit() {
  const form = useUserProfileForm({
    defaultValues: {
      languages: [] as Language[],
    },
    validators: {
      onSubmit: SelectedLanguagesSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  // Temporary data
  const languages = [
    { id: 1, name: "Nederlands" },
    { id: 2, name: "Engels" },
    { id: 3, name: "Spaans" },
    { id: 4, name: "Fins" },
    { id: 5, name: "Zweeds" },
  ];
  const levels = [
    { id: 1, name: "B1" },
    { id: 2, name: "B2" },
    { id: 3, name: "C1" },
    { id: 4, name: "C2" },
  ];

  return (
    <Dialog modal={false}>
      <DialogTrigger>
        <Button>
          Edit talen
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Talen</DialogTitle>
          <DialogDescription>Update je talen</DialogDescription>
        </DialogHeader>
        <form
          className="py-3"
          id="languages"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="languages"
              mode="array"
              children={(languagesField) => (
                <div className="flex flex-wrap gap-2">
                  {!languagesField.state.value.length ? (
                    <p className="h-11 text-sm">Geen talen geselecteerd.</p>
                  ) : (
                    languagesField.state.value.map((_, i) => (
                      <form.AppField
                        key={i}
                        name={`languages[${i}]`}
                        children={() => (
                          <SelectedLanguageField levels={levels} />
                        )}
                      />
                    ))
                  )}
                </div>
              )}
            />

            <form.AppField
              name="languages"
              children={(field) => {
                const selectedLanguageIds = field.state.value.map(
                  (s: Language) => s.id,
                );
                const availableLanguages = languages.filter(
                  (language) => !selectedLanguageIds.includes(language.id),
                );
                return (
                  <field.SearchLanguagesField languages={availableLanguages} />
                );
              }}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button type="submit" form="languages">
            Save
          </Button>
          <DialogClose asChild>
            <Button variant="secondary" type="button">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { LanguagesEdit };
