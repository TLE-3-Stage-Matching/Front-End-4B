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
import { apiFetch } from "@/lib/query-client";

function SkillsEditForm({
  allSkills,
  studentSkills,
}: {
  allSkills: SkillQuality[];
  studentSkills: SkillQuality[];
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (tags: SkillQuality[]) =>
      apiFetch("/api/student/tags", {
        method: "PUT",
        body: JSON.stringify({
          tags: tags.map((s) => ({
            tag_id: s.id,
            is_active: s.toggle ?? true,
          })),
        }),
      }),
    onSuccess: () => {
      toast.success("Vaardigheden opgeslagen");
      queryClient.invalidateQueries({ queryKey: ["/api/student/tags"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const form = useUserProfileForm({
    defaultValues: {
      SkillQualities: studentSkills,
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
        id="skills-form"
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
                    skillsField.state.value.map((_, i) => (
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
              const selectedSkillIds = field.state.value.map(
                (s: SkillQuality) => s.id,
              );
              const availableSkills = allSkills.filter(
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
        <Button type="submit" form="skills-form" disabled={mutation.isPending}>
          {mutation.isPending && <Spinner />}
          Save
        </Button>
      </DialogFooter>
    </>
  );
}

function SkillsEdit() {
  const allSkillsQuery = useQuery<{
    data: Array<{ id: number; name: string }>;
  }>({
    queryKey: ["/api/tags?tag_type=skill"],
  });

  const studentTagsQuery = useQuery<{
    data: Array<{
      tag_id: number;
      is_active: boolean;
      tag: { id: number; name: string };
    }>;
  }>({
    queryKey: ["/api/student/tags"],
  });

  const allSkills: SkillQuality[] = (allSkillsQuery.data?.data ?? []).map(
    (item) => ({ id: item.id, name: item.name }),
  );

  const studentSkills: SkillQuality[] = (studentTagsQuery.data?.data ?? []).map(
    (item) => ({
      id: item.tag_id,
      name: item.tag.name,
      toggle: item.is_active,
    }),
  );

  const isLoading = allSkillsQuery.isLoading || studentTagsQuery.isLoading;

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
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner className="size-6" />
          </div>
        ) : (
          <SkillsEditForm allSkills={allSkills} studentSkills={studentSkills} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export { SkillsEdit };
