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
import {
  PrefrencesSchema,
  type JobFunction,
  type Prefrences,
} from "@/types/user-profile";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/query-client";

function PrefrencesEditForm({
  allRoles,
  studentPreferences,
}: {
  allRoles: JobFunction[];
  studentPreferences: Prefrences;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: Prefrences) =>
      apiFetch("/api/student/preferences", {
        method: "PUT",
        body: JSON.stringify({
          desired_role_tag_id: values.jobFunction?.id || null,
          hours_per_week_min: values.hours[0] || null,
          hours_per_week_max: values.hours[1] || null,
          max_distance_km: values.distance || null,
          has_drivers_license: values.has_drivers_license,
          notes: values.notes || null,
        }),
      }),
    onSuccess: () => {
      toast.success("Voorkeuren opgeslagen");
      queryClient.invalidateQueries({
        queryKey: ["/api/student/preferences"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const form = useUserProfileForm({
    defaultValues: studentPreferences,
    validators: {
      onSubmit: PrefrencesSchema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
    // onSubmitInvalid: ({ value, formApi }) => {
    //   console.log("Form validation errors:", formApi.state.errors);
    //   console.log(
    //     "Field errors:",
    //     Object.fromEntries(
    //       Object.entries(formApi.state.fieldMeta).map(([field, meta]) => [
    //         field,
    //         meta.errors,
    //       ]),
    //     ),
    //   );
    // },
  });

  return (
    <>
      <form
        className="py-3"
        id="preferences-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.AppField
            name="jobFunction"
            children={(field) => (
              <field.SearchJobFunctionField jobFunctions={allRoles} />
            )}
          />
          <form.AppField
            name="hours"
            children={(field) => <field.HoursRangeField />}
          />
          <form.AppField
            name="distance"
            children={(field) => <field.DistanceField />}
          />
          <form.AppField
            name="has_drivers_license"
            children={(field) => <field.DriversLicenseField />}
          />
          <form.AppField
            name="notes"
            children={(field) => (
              <field.TextAreaField
                label="Notities"
                placeholder="Extra informatie..."
                maxCharacters="200"
                rows={1}
              />
            )}
          />
        </FieldGroup>
      </form>
      <DialogFooter>
        <Button
          type="submit"
          form="preferences-form"
          disabled={mutation.isPending}
        >
          {mutation.isPending && <Spinner />}
          Save
        </Button>
      </DialogFooter>
    </>
  );
}

function PrefrencesEdit() {
  const allRolesQuery = useQuery<{
    data: Array<{ id: number; name: string }>;
  }>({
    queryKey: ["/api/tags?tag_type=major"],
  });

  const preferencesQuery = useQuery<{
    data: {
      desired_role_tag_id: number | null;
      hours_per_week_min: number | null;
      hours_per_week_max: number | null;
      max_distance_km: number | null;
      has_drivers_license: boolean;
      notes: string | null;
      desired_role_tag: { id: number; name: string } | null;
    };
  }>({
    queryKey: ["/api/student/preferences"],
  });

  const allRoles: JobFunction[] = (allRolesQuery.data?.data ?? []).map(
    (item) => ({ id: item.id, name: item.name }),
  );

  const prefData = preferencesQuery.data?.data;
  const studentPreferences: Prefrences = {
    jobFunction: prefData?.desired_role_tag
      ? {
          id: prefData.desired_role_tag.id,
          name: prefData.desired_role_tag.name,
        }
      : { id: 0, name: "" },
    hours: [
      Math.min(40, Math.max(1, prefData?.hours_per_week_min ?? 1)),
      Math.min(40, Math.max(1, prefData?.hours_per_week_max ?? 1)),
    ],
    distance: prefData?.max_distance_km ?? 0,
    has_drivers_license: prefData?.has_drivers_license ?? false,
    notes: prefData?.notes ?? "",
  };

  const isLoading = allRolesQuery.isLoading || preferencesQuery.isLoading;

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
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner className="size-6" />
          </div>
        ) : (
          <PrefrencesEditForm
            allRoles={allRoles}
            studentPreferences={studentPreferences}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export { PrefrencesEdit };
