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
import { ScrollArea } from "@/components/ui/scroll-area";

function SkillsEdit() {
  const form = useUserProfileForm({
    defaultValues: {
      SkillQualities: [] as SkillQuality[],
    },
    validators: {
      onChange: SelectedSkillQualitySchema,
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
    { id: 6, name: "6" },
    { id: 7, name: "7" },
    { id: 8, name: "8" },
    { id: 9, name: "9" },
  ];

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button>
          Edit vaardigheden
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
          <DialogTitle>Vaardigheden</DialogTitle>
          <DialogDescription>Update je vaardigheden</DialogDescription>
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
            <ScrollArea className="h-20 w-full">
              <form.Field
                name="SkillQualities"
                mode="array"
                children={(skillsField) => (
                  <div className="flex flex-wrap gap-2">
                    {!skillsField.state.value.length ? (
                      <p className="h-7 text-sm">
                        Geen vaardigheden geselecteerd.
                      </p>
                    ) : (
                      skillsField.state.value.map((item, i) => (
                        <form.AppField
                          key={item.id ?? i}
                          name={`SkillQualities[${i}]`}
                          children={() => <SelectedItemField />}
                        />
                      ))
                    )}
                  </div>
                )}
              />
            </ScrollArea>

            <form.AppField
              name="SkillQualities"
              children={(field) => {
                const selectedSkillIds = field.state.value.map(
                  (s: SkillQuality) => s.id,
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
