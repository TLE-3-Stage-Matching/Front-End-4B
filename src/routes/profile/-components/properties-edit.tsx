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
import { SelectedItemField } from "@/components/form/user-profile";
import { Cog } from "lucide-react";
import { useUserProfileForm } from "@/hooks/user-profile.form";
import { SelectedSkillPropsSchema, type SkillProp } from "@/types/user-profile";

function PropertiesEdit() {
  const form = useUserProfileForm({
    defaultValues: {
      skillProps: [] as SkillProp[],
    },
    validators: {
      onSubmit: SelectedSkillPropsSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  // Temporary data
  const properties = [
    { id: 1, name: "Leergierig" },
    { id: 2, name: "Meekijken" },
    { id: 3, name: "Social" },
    { id: 4, name: "anders1" },
    { id: 5, name: "anders2" },
  ];

  return (
    <Dialog modal={false}>
      <DialogTrigger>
        <Button>
          Edit eigenschappen
          <Cog />
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
          <DialogTitle>Eigenschappen</DialogTitle>
          <DialogDescription>Update je eigenschappen</DialogDescription>
        </DialogHeader>
        <form
          className="py-3"
          id="properties"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="skillProps"
              mode="array"
              children={(propertiesField) => (
                <div className="flex flex-wrap gap-2">
                  {!propertiesField.state.value.length ? (
                    <p className="h-7 text-sm">
                      Geen Eigenschappen geselecteerd.
                    </p>
                  ) : (
                    propertiesField.state.value.map((_, i) => (
                      <form.AppField
                        key={i}
                        name={`skillProps[${i}]`}
                        children={() => <SelectedItemField />}
                      />
                    ))
                  )}
                </div>
              )}
            />

            <form.AppField
              name="skillProps"
              children={(field) => {
                const selectedPropertyIds = field.state.value.map(
                  (p: SkillProp) => p.id,
                );
                const availableProperties = properties.filter(
                  (property) => !selectedPropertyIds.includes(property.id),
                );
                return (
                  <field.SearchListField
                    items={availableProperties}
                    type="Property"
                  />
                );
              }}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button type="submit" form="properties">
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

export { PropertiesEdit };
