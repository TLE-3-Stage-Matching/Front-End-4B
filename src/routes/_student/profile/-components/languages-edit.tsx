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
import { SelectedLanguageField } from "@/components/form/user-profile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SquarePen } from "lucide-react";
import { useUserProfileForm } from "@/hooks/user-profile.form";
import { SelectedLanguagesSchema, type Language } from "@/types/user-profile";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/query-client";

function LanguagesEditForm({
  allLanguages,
  levels,
  studentLanguages,
}: {
  allLanguages: Language[];
  levels: Array<{ id: number; name: string }>;
  studentLanguages: Language[];
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (languages: Language[]) =>
      apiFetch("/api/student/languages", {
        method: "PUT",
        body: JSON.stringify({
          languages: languages.map((language) => ({
            language_id: language.id,
            language_level_id: language.level?.id,
            is_active: true,
          })),
        }),
      }),
    onSuccess: () => {
      toast.success("Talen opgeslagen");
      queryClient.invalidateQueries({ queryKey: ["/api/student/languages"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const form = useUserProfileForm({
    defaultValues: {
      languages: studentLanguages,
    },
    validators: {
      onSubmit: SelectedLanguagesSchema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value.languages);
    },
  });

  return (
    <>
      <form
        className="py-3"
        id="languages"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="max-h-[min(60vh,28rem)] overflow-y-auto px-2">
          <ScrollArea className="h-20 w-full">
            <form.Field
              name="languages"
              mode="array"
              children={(languagesField) => (
                <div className="flex flex-wrap gap-2">
                  {!languagesField.state.value.length ? (
                    <p className="h-11 text-sm">Geen talen geselecteerd.</p>
                  ) : (
                    languagesField.state.value.map((_, i) => (
                      <form.AppField
                        key={i}
                        name={`languages[${i}]`}
                        children={() => (
                          <SelectedLanguageField levels={levels} />
                        )}
                      />
                    ))
                  )}
                </div>
              )}
            />
          </ScrollArea>

          <form.AppField
            name="languages"
            children={(field) => {
              const selectedLanguageIds = field.state.value.map(
                (s: Language) => s.id,
              );
              const availableLanguages = allLanguages.filter(
                (language) => !selectedLanguageIds.includes(language.id),
              );
              return (
                <field.SearchLanguagesField languages={availableLanguages} />
              );
            }}
          />
        </FieldGroup>
      </form>
      <DialogFooter>
        <Button type="submit" form="languages" disabled={mutation.isPending}>
          {mutation.isPending && <Spinner />}
          Save
        </Button>
      </DialogFooter>
    </>
  );
}

function LanguagesEdit() {
  const languagesQuery = useQuery<{
    data: Array<{ id: number; name: string }>;
  }>({
    queryKey: ["/api/languages"],
  });

  const levelsQuery = useQuery<{
    data: Array<{ id: number; name: string }>;
  }>({
    queryKey: ["/api/language-levels"],
  });

  const studentLanguagesQuery = useQuery<{
    data: Array<{
      language_id: number;
      language_level_id: number;
      is_active: boolean;
      language: { id: number; name: string };
      language_level: { id: number; name: string };
    }>;
  }>({
    queryKey: ["/api/student/languages"],
  });

  const allLanguages: Language[] = (languagesQuery.data?.data ?? []).map(
    (language) => ({ id: language.id, name: language.name }),
  );

  const levels = levelsQuery.data?.data ?? [];

  const studentLanguages: Language[] = (
    studentLanguagesQuery.data?.data ?? []
  ).map((entry) => ({
    id: entry.language_id,
    name: entry.language.name,
    level: {
      id: entry.language_level.id,
      name: entry.language_level.name,
    },
  }));

  const isLoading =
    languagesQuery.isLoading ||
    levelsQuery.isLoading ||
    studentLanguagesQuery.isLoading;

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button>
          Edit talen
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
          <DialogTitle>Talen</DialogTitle>
          <DialogDescription>Update je talen</DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner className="size-6" />
          </div>
        ) : (
          <LanguagesEditForm
            allLanguages={allLanguages}
            levels={levels}
            studentLanguages={studentLanguages}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export { LanguagesEdit };
