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
import { SelectedItemField } from "@/components/form/user-profile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { SquarePen } from "lucide-react";
import { useUserProfileForm } from "@/hooks/user-profile.form";
import {
  SelectedSkillQualitySchema,
  type SkillQuality,
} from "@/types/user-profile";
import { Spinner } from "@/components/ui/spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/queryClient";

function QualitiesEditForm({
  allQualities,
  studentQualities,
}: {
  allQualities: SkillQuality[];
  studentQualities: SkillQuality[];
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (tags: SkillQuality[]) =>
      apiFetch("/api/student/properties", {
        method: "PUT",
        body: JSON.stringify({
          tags: tags.map((q) => ({
            tag_id: q.id,
            is_active: q.toggle ?? true,
          })),
        }),
      }),
    onSuccess: () => {
      toast.success("Eigenschappen opgeslagen");
      queryClient.invalidateQueries({ queryKey: ["/api/student/properties"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const form = useUserProfileForm({
    defaultValues: {
      SkillQualities: studentQualities,
    },
    validators: {
      onChange: SelectedSkillQualitySchema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value.SkillQualities);
    },
  });

  return (
    <>
      <form
        className="py-3"
        id="qualities-form"
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
              children={(qualitiesField) => (
                <div className="flex flex-wrap gap-2">
                  {!qualitiesField.state.value.length ? (
                    <p className="h-7 text-sm">
                      Geen eigenschappen geselecteerd.
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
          </ScrollArea>

          <form.AppField
            name="SkillQualities"
            children={(field) => {
              const selectedQualityIds = field.state.value.map(
                (q: SkillQuality) => q.id,
              );
              const availableQualities = allQualities.filter(
                (quality) => !selectedQualityIds.includes(quality.id),
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
        <Button
          type="submit"
          form="qualities-form"
          disabled={mutation.isPending}
        >
          {mutation.isPending && <Spinner />}
          Save
        </Button>
      </DialogFooter>
    </>
  );
}

function QualitiesEdit() {
  const allQualitiesQuery = useQuery<{
    data: Array<{ id: number; name: string }>;
  }>({
    queryKey: ["/api/tags?tag_type=quality"],
  });

  const studentPropertiesQuery = useQuery<{
    data: Array<{
      tag_id: number;
      is_active: boolean;
      tag: { id: number; name: string };
    }>;
  }>({
    queryKey: ["/api/student/tags"],
  });

  const allQualities: SkillQuality[] = (allQualitiesQuery.data?.data ?? []).map(
    (item) => ({ id: item.id, name: item.name }),
  );

  const studentQualities: SkillQuality[] = (
    studentPropertiesQuery.data?.data ?? []
  ).map((item) => ({
    id: item.tag_id,
    name: item.tag.name,
    toggle: item.is_active,
  }));

  const isLoading =
    allQualitiesQuery.isLoading || studentPropertiesQuery.isLoading;

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
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
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner className="size-6" />
          </div>
        ) : (
          <QualitiesEditForm
            allQualities={allQualities}
            studentQualities={studentQualities}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export { QualitiesEdit };
