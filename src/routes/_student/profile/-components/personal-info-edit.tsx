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
import { Github, Linkedin, Globe } from "lucide-react";

function PersonalInfoEdit() {
  const form = useUserProfileForm({
    defaultValues: {
      firstName: "",
      infix: "",
      lastName: "",
      ZIPCode: "",
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
                  children={(field) => <field.InputField label="Voornaam" />}
                />
              </div>
              <div className="w-24">
                <form.AppField
                  name="infix"
                  children={(field) => <field.InputField label="Tussenvoegsel" />}
                />
              </div>
              <div className="flex-1">
                <form.AppField
                  name="lastName"
                  children={(field) => <field.InputField label="Achternaam" />}
                />
              </div>
            </div>
            <div className="grid gap-2 xl:grid-cols-2">
              <form.AppField
                name="ZIPCode"
                children={(field) => <field.InputField label="Postcode" placeholder="1234 AB" />}
              />
              <form.AppField
                name="website"
                children={(field) => <field.LinkField label="Website" icon={<Globe />} placeholder="example.com" />}
              />
              <form.AppField
                name="github"
                children={(field) => <field.LinkField label="GitHub" icon={<Github />} placeholder="github.com/username" />}
              />
              <form.AppField
                name="linkin"
                children={(field) => <field.LinkField label="LinkedIn" icon={<Linkedin />} placeholder="linkedin.com/in/username" />}
              />
            </div>
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
