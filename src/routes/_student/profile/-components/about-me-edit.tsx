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
import { SquarePen } from "lucide-react";
import { useUserProfileForm } from "@/hooks/user-profile.form";
import { AboutMeSchema } from "@/types/user-profile";

function AboutMeEdit() {
  const form = useUserProfileForm({
    defaultValues: {
      about: "",
    },
    validators: {
      onSubmit: AboutMeSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button>
          Edit over mij
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
          <DialogTitle>Over Mij</DialogTitle>
          <DialogDescription>Update je over mij</DialogDescription>
        </DialogHeader>
        <form
          className="py-3"
          id="information"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.AppField
              name="about"
              children={(field) => <field.TextAreaField label="Over mij" maxCharacters="500" />}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button type="submit" form="information">
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

export { AboutMeEdit };
