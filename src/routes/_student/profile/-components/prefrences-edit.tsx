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
import { PrefrencesSchema, type JobFunction } from "@/types/user-profile";

// Temporary  data
const JobFunctions: JobFunction[] = [
  { id: 1, name: "Frontend Developer" },
  { id: 2, name: "Backend Developer" },
  { id: 3, name: "Full Stack Developer" },
  { id: 4, name: "UI/UX Designer" },
  { id: 5, name: "DevOps Engineer" },
];

function PrefrencesEdit() {
  const form = useUserProfileForm({
    defaultValues: {
      jobFunction: {
        id: 0,
        name: "",
      },
      hours: 0,
      distance: 0,
      compensation: 0,
    },
    validators: {
      onSubmit: PrefrencesSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button>
          Edit voorkeuren
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
          <DialogTitle>Voorkeuren</DialogTitle>
          <DialogDescription>Update je voorkeuren</DialogDescription>
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
              name="jobFunction"
              children={(field) => (
                <field.SearchJobFunctionField jobFunctions={JobFunctions} />
              )}
            />
            <form.AppField
              name="hours"
              children={(field) => <field.HoursField />}
            />
            <form.AppField
              name="distance"
              children={(field) => <field.DistanceField />}
            />
            <form.AppField
              name="compensation"
              children={(field) => <field.CompensationField />}
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

export { PrefrencesEdit };
