import {
  Dialog,
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
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/query-client";

type StudentProfileResponse = {
  data: {
    student_profile: {
      bio: string | null;
      postal_code: string | null;
    };
  };
};

function AboutMeEditForm({
  bio,
  postalCode,
}: {
  bio: string;
  postalCode: string;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (value: { postalCode: string; bio: string }) =>
      apiFetch("/api/student/profile", {
        method: "PATCH",
        body: JSON.stringify({
          bio: value.bio,
          postal_code: value.postalCode,
        }),
      }),
    onSuccess: () => {
      toast.success("Gegevens opgeslagen");
      queryClient.invalidateQueries({ queryKey: ["/api/student/profile"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const form = useUserProfileForm({
    defaultValues: {
      postalCode,
      bio,
    },
    validators: {
      onSubmit: AboutMeSchema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  return (
    <>
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
            name="postalCode"
            children={(field) => (
              <field.InputField
                label="Postcode"
                placeholder="1234 AB"
                autocomplete="postal-code"
              />
            )}
          />
          <form.AppField
            name="bio"
            children={(field) => (
              <field.TextAreaField
                label="Over mij"
                placeholder="Korte beschrijving over je zelf"
                maxCharacters="500"
              />
            )}
          />
        </FieldGroup>
      </form>
      <DialogFooter>
        <Button type="submit" form="information" disabled={mutation.isPending}>
          {mutation.isPending && <Spinner />}
          Save
        </Button>
      </DialogFooter>
    </>
  );
}

function AboutMeEdit() {
  const profileQuery = useQuery<StudentProfileResponse>({
    queryKey: ["/api/student/profile"],
  });

  const isLoading = profileQuery.isLoading;
  const profile = profileQuery.data?.data.student_profile;

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
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner className="size-6" />
          </div>
        ) : (
          <AboutMeEditForm
            bio={profile?.bio ?? ""}
            postalCode={profile?.postal_code ?? ""}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export { AboutMeEdit };
