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
import { RegisterSchema } from "@/types/user";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/query-client";
import { Skeleton } from "../ui/skeleton";

type StudentProfileResponse = {
  data: {
    first_name: string;
    middle_name: string | null;
    last_name: string;
    email: string;
    phone: string | null;
  };
};

function AccountEditForm({
  first_name,
  middle_name,
  last_name,
  email,
}: {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (value: {
      first_name: string;
      middle_name: string;
      last_name: string;
      email: string;
      password: string;
    }) =>
      apiFetch("/api/student/profile", {
        method: "PATCH",
        body: JSON.stringify({
          first_name: value.first_name,
          middle_name: value.middle_name || null,
          last_name: value.last_name,
          email: value.email,
          ...(value.password ? { password: value.password } : {}),
        }),
      }),
    onSuccess: () => {
      toast.success("Persoonsgegevens opgeslagen");
      queryClient.invalidateQueries({ queryKey: ["/api/student/profile"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const form = useUserProfileForm({
    defaultValues: {
      first_name,
      middle_name,
      last_name,
      email,
      password: "",
      confirm_password: "",
    },
    validators: {
      onSubmit: RegisterSchema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  return (
    <>
      <form
        className="py-3"
        id="personal-info"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="max-h-[min(60vh,28rem)] overflow-y-auto px-2">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <form.AppField
                name="first_name"
                children={(field) => (
                  <field.InputField
                    label="Voornaam"
                    placeholder="Voornaam"
                    autocomplete="given-name"
                  />
                )}
              />
            </div>
            <div className="w-24">
              <form.AppField
                name="middle_name"
                children={(field) => (
                  <field.InputField
                    label="Tussenvoegsel"
                    placeholder="van"
                    autocomplete="additional-name"
                  />
                )}
              />
            </div>
            <div className="flex-1">
              <form.AppField
                name="last_name"
                children={(field) => (
                  <field.InputField
                    label="Achternaam"
                    placeholder="Achternaam"
                    autocomplete="family-name"
                  />
                )}
              />
            </div>
          </div>
          <form.AppField
            name="email"
            children={(field) => (
              <field.InputField
                label="Email"
                placeholder="email@example.com"
                autocomplete="email"
              />
            )}
          />
          <form.AppField
            name="password"
            children={(field) => (
              <field.InputField
                label="Nieuw wachtwoord"
                type="password"
                autocomplete="new-password"
              />
            )}
          />
          <form.AppField
            name="confirm_password"
            validators={{
              onChangeListenTo: ["password"],
              onChange: ({ value, fieldApi }) => {
                const pw = fieldApi.form.getFieldValue("password");
                if (pw && value !== pw) {
                  return { message: "Wachtwoorden komen niet overeen" };
                }
                return undefined;
              },
            }}
            children={(field) => (
              <field.InputField
                label="Bevestig wachtwoord"
                type="password"
                autocomplete="new-password"
                placeholder="Bevestig wachtwoord"
              />
            )}
          />
        </FieldGroup>
      </form>
      <DialogFooter>
        <Button
          type="submit"
          form="personal-info"
          disabled={mutation.isPending}
        >
          {mutation.isPending && <Spinner />}
          Save
        </Button>
      </DialogFooter>
    </>
  );
}

function AccountEdit() {
  const profileQuery = useQuery<StudentProfileResponse>({
    queryKey: ["/api/student/profile"],
  });

  const isLoading = profileQuery.isLoading;
  const data = profileQuery.data?.data;

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
          <DialogTitle>Persoonsgegevens</DialogTitle>
          <DialogDescription>Update je persoonsgegevens</DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner className="size-6" />
          </div>
        ) : (
          <AccountEditForm
            first_name={data?.first_name ?? ""}
            middle_name={data?.middle_name ?? ""}
            last_name={data?.last_name ?? ""}
            email={data?.email ?? ""}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function AccountSection() {
  const { data, isLoading } = useQuery<{
    data: {
      first_name: string;
      middle_name: string | null;
      last_name: string;
      email: string;
      phone: string | null;
    };
  }>({
    queryKey: ["/api/student/profile"],
  });

  if (isLoading) {
    return (
      <section className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-36" />
      </section>
    );
  }

  const user = data?.data;
  const fullName = [user?.first_name, user?.middle_name, user?.last_name]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{fullName}</h3>
          {user?.email && (
            <Button variant="link" asChild className="h-auto p-0 text-sm">
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </Button>
          )}
          {user?.phone && (
            <p className="text-sm text-primary" aria-label="Telefoonnummer">
              {user.phone}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export { AccountEdit, AccountSection };
