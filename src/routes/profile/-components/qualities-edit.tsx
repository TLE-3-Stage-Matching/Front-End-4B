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
import { SquarePen } from "lucide-react";
import { useUserProfileForm } from "@/hooks/user-profile.form";
import {
  SelectedSkillQualitySchema,
  type SkillQuality,
} from "@/types/user-profile";

function QualitiesEdit() {
  const form = useUserProfileForm({
    defaultValues: {
      SkillQualities: [] as SkillQuality[],
    },
    validators: {
      onSubmit: SelectedSkillQualitySchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  // Temporary data
  const qualities = [
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
          <DialogTitle>Eigenschappen</DialogTitle>
          <DialogDescription>Update je eigenschappen</DialogDescription>
        </DialogHeader>
        <form
          className="py-3"
          id="qualities"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="SkillQualities"
              mode="array"
              children={(qualitiesField) => (
                <div className="flex flex-wrap gap-2">
                  {!qualitiesField.state.value.length ? (
                    <p className="h-7 text-sm">
                      Geen Eigenschappen geselecteerd.
                    </p>
                  ) : (
                    qualitiesField.state.value.map((_, i) => (
                      <form.AppField
                        key={i}
                        name={`SkillQualities[${i}]`}
                        children={() => <SelectedItemField />}
                      />
                    ))
                  )}
                </div>
              )}
            />

            <form.AppField
              name="SkillQualities"
              children={(field) => {
                const selectedPropertyIds = field.state.value.map(
                  (p: SkillQuality) => p.id,
                );
                const availableQualities = qualities.filter(
                  (quality) => !selectedPropertyIds.includes(quality.id),
                );
                return (
                  <field.SearchListField
                    items={availableQualities}
                    type="Quality"
                  />
                );
              }}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button type="submit" form="qualities">
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

export { QualitiesEdit };
