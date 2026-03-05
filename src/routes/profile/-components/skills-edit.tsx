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

function SkillsEdit() {
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
  const skills = [
    { id: 1, name: "Next.js" },
    { id: 2, name: "SvelteKit" },
    { id: 3, name: "Nuxt.js" },
    { id: 4, name: "Remix" },
    { id: 5, name: "Astro" },
  ];

  return (
    <Dialog modal={false}>
      <DialogTrigger>
        <Button>
          Edit vaardigheden
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
          <DialogTitle>Vaardigheden</DialogTitle>
          <DialogDescription>
            Update je vaardigheden
          </DialogDescription>
        </DialogHeader>
        <form
          className="py-3"
          id="skills"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="skillProps"
              mode="array"
              children={(skillsField) => (
                <div className="flex flex-wrap gap-2">
                  {!skillsField.state.value.length ? (
                    <p className="h-7 text-sm">
                      Geen vaardigheden geselecteerd.
                    </p>
                  ) : (
                    skillsField.state.value.map((_, i) => (
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
                const selectedSkillIds = field.state.value.map(
                  (s: SkillProp) => s.id,
                );
                const availableSkills = skills.filter(
                  (skill) => !selectedSkillIds.includes(skill.id),
                );
                return (
                  <field.SearchListField items={availableSkills} type="Skill" />
                );
              }}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button type="submit" form="skills">
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

export { SkillsEdit };
