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
import { PersonalInfoSchema } from "@/types/user-profile";

function PersonalInfoEdit() {
  const form = useUserProfileForm({
    defaultValues: {
      firstName: "",
      infix: "",
      lastName: "",
      ZIPCode: "",
      about: "",
      github: "",
      linkin: "",
      website: "",
    },
    validators: {
      onSubmit: PersonalInfoSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button>
          Edit gegevens
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="xl:min-w-2xl"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Gegevens</DialogTitle>
          <DialogDescription>Update je gegevens</DialogDescription>
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
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <form.AppField
                  name="firstName"
                  children={(field) => <field.FirstNameField />}
                />
              </div>
              <div className="w-24">
                <form.AppField
                  name="infix"
                  children={(field) => <field.InfixField />}
                />
              </div>
              <div className="flex-1">
                <form.AppField
                  name="lastName"
                  children={(field) => <field.LastNameField />}
                />
              </div>
            </div>
            <div className="xl:grid-cols-2 grid gap-2">
              <form.AppField
                name="ZIPCode"
                children={(field) => <field.ZIPCodeField />}
              />
              <form.AppField
                name="website"
                children={(field) => <field.WebsiteLinkField />}
              />
              <form.AppField
                name="github"
                children={(field) => <field.GitHubLinkField />}
              />
              <form.AppField
                name="linkin"
                children={(field) => <field.LinkedInLinkField />}
              />
            </div>
            <form.AppField
              name="about"
              children={(field) => <field.AboutField />}
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

export { PersonalInfoEdit };
