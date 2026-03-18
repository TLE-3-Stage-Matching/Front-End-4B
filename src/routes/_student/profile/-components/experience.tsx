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
import { SquarePen, Trash } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/query-client";
import { toast } from "sonner";
import { useUserProfileForm } from "@/hooks/user-profile.form";
import { ExperienceSchema, type Experience } from "@/types/user-profile";
import { Skeleton } from "@/components/ui/skeleton";

type ExperienceListItem = {
  id: number;
  title: string;
  company_name: string;
  start_date: string;
  end_date?: string | null;
  description?: string | null;
};

/**
 * Formats an ISO date to a Dutch display date.
 */
function formatDate(date: string | null | undefined) {
  if (!date) {
    return "heden";
  }

  return new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Renders the create experience form and submits it to the API.
 */
function ExperienceCreateForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (experience: Experience) =>
      apiFetch("/api/student/experiences", {
        method: "POST",
        body: JSON.stringify({
          ...experience,
        }),
      }),
    onSuccess: () => {
      toast.success("Ervaring opgeslagen");
      queryClient.invalidateQueries({ queryKey: ["/api/student/experiences"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const form = useUserProfileForm({
    defaultValues: {
      title: "",
      company_name: "",
      start_date: "",
      end_date: "",
      description: "",
    },
    validators: {
      onChange: ExperienceSchema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  return (
    <>
      <form
        className="py-3"
        id="experience-create-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="max-h-[min(60vh,28rem)] overflow-y-auto px-2">
          <form.AppField
            name="title"
            children={(field) => <field.InputField label="Titel" />}
          />
          <form.AppField
            name="company_name"
            children={(field) => <field.InputField label="bedrijf" />}
          />
          <form.AppField
            name="start_date"
            children={(field) => <field.DateField label="Start datum" />}
          />
          <form.AppField
            name="end_date"
            children={(field) => <field.DateField label="Eind datum" />}
          />
          <form.AppField
            name="description"
            children={(field) => (
              <field.TextAreaField label="Omschrijving" maxCharacters="500" />
            )}
          />
        </FieldGroup>
      </form>
      <DialogFooter>
        <Button
          type="submit"
          form="experience-create-form"
          disabled={mutation.isPending}
        >
          {mutation.isPending && <Spinner />}
          Save
        </Button>
      </DialogFooter>
    </>
  );
}

/**
 * Renders the dialog trigger and content for creating an experience.
 */
function ExperienceCreate() {
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button>
          Maak ervaring
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
          <DialogTitle>Ervaring</DialogTitle>
          <DialogDescription>Maak je ervaring</DialogDescription>
        </DialogHeader>
        <ExperienceCreateForm />
      </DialogContent>
    </Dialog>
  );
}

/**
 * Renders edit and delete controls for a single experience.
 */
function ExperienceEdit({ value }: { value: ExperienceListItem }) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (experience: Experience) =>
      apiFetch(`/api/student/experiences/${value.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...experience,
        }),
      }),
    onSuccess: () => {
      toast.success("Ervaring opgeslagen");
      queryClient.invalidateQueries({ queryKey: ["/api/student/experiences"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      apiFetch(`/api/student/experiences/${value.id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      toast.success("Ervaring verwijdered");
      queryClient.invalidateQueries({
        queryKey: ["/api/student/experiences"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const form = useUserProfileForm({
    defaultValues: {
      title: value.title ?? "",
      company_name: value.company_name ?? "",
      start_date: value.start_date ?? "",
      end_date: value.end_date ?? "",
      description: value.description ?? "",
    },
    validators: {
      onChange: ExperienceSchema,
    },
    onSubmit: async ({ value }) => {
      updateMutation.mutate(value);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          Edit ervaring
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
          <DialogTitle>Ervaring</DialogTitle>
          <DialogDescription>Edit je ervaring</DialogDescription>
        </DialogHeader>
        <form
          className="py-3"
          id="experience-edit-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="max-h-[min(60vh,28rem)] overflow-y-auto px-2">
            <form.AppField
              name="title"
              children={(field) => <field.InputField label="Titel" />}
            />
            <form.AppField
              name="company_name"
              children={(field) => <field.InputField label="bedrijf" />}
            />
            <form.AppField
              name="start_date"
              children={(field) => <field.DateField label="Start datum" />}
            />
            <form.AppField
              name="end_date"
              children={(field) => <field.DateField label="Eind datum" />}
            />
            <form.AppField
              name="description"
              children={(field) => (
                <field.TextAreaField label="Omschrijving" maxCharacters="500" />
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button
            variant="accent"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? <Spinner /> : <Trash />}
            Verwijder
          </Button>
          <Button
            type="submit"
            form="experience-edit-form"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending && <Spinner />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Renders the experience list with newest start dates first.
 */
function ExperienceSection() {
  const { data, isLoading } = useQuery<{
    data: ExperienceListItem[];
  }>({
    queryKey: ["/api/student/experiences"],
  });

  if (isLoading) {
    return (
      <section className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-md border p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-16 w-full" />
          </div>
        ))}
      </section>
    );
  }

  const experiences = [...(data?.data ?? [])].sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
  );

  return (
    <section className="space-y-4">
      {experiences.map((experience) => (
        <article
          key={experience.id}
          className="space-y-2 rounded-md border p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="grid space-x-2">
              <h3 className="text-lg font-semibold">
                {experience.company_name}
              </h3>
              <p className="text-secondary">{experience.title}</p>
              <p className="lex flex-wrap pt-1 text-right text-sm text-tertiary lg:col-start-2 lg:row-start-1">
                {formatDate(experience.start_date)} -{" "}
                {formatDate(experience.end_date)}
              </p>
            </div>
            <ExperienceEdit value={experience} />
          </div>
          {experience.description ? <p>{experience.description}</p> : null}
        </article>
      ))}
    </section>
  );
}

export { ExperienceCreate, ExperienceSection };
