import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FormSaveButton } from "@/components/ui/form-save-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRegisterForm } from "@/hooks/register.form";
import { RegisterStudentSchema } from "@/types/user";
import { FieldGroup } from "@/components/ui/field";

export const Route = createFileRoute(
  "/internship-coordinator/register-student-account",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useRegisterForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: RegisterStudentSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      setShowSuccess(false);
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccess(true);
      });
      console.log(value);
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  /**
  const isEmailValid = useMemo(() => {
    const email = studentEmail.trim();
    if (email.length === 0) return false;
    if (email.includes(" ")) return false;

    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
  }, [studentEmail]);

  const canSave = isEmailValid;

  const errorClass =
    studentEmail.trim().length > 0 && !isEmailValid
      ? "animate-shake border-destructive"
      : "";

      const errorId = "email-error";
      
      */

  // Saving is indicated with a spinning thing, This is for the user to know that something is actually happening. Now almost invisible, but once it goes through the API.

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center px-2 py-16 sm:px-0">
      <h1 className="mb-10 text-center text-5xl font-bold">
        Student toevoegen
      </h1>

      <div className="w-full max-w-md">
        <Card className="bg-white text-foreground">
          <CardHeader>
            <CardTitle>E-mailadres instellen</CardTitle>
            <CardDescription className="text-foreground">
              Vul het e-mailadres in van de student.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="register"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                <form.AppField
                  name="email"
                  children={(field) => (
                    <field.EmailField label="Student Email" />
                  )}
                />
              </FieldGroup>
              <form.Subscribe
                selector={(state) => ({
                  canSave: state.canSubmit && state.isDirty,
                })}
                children={({ canSave }) => (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FormSaveButton
                        className="mt-4"
                        enabled={canSave}
                        loading={isLoading}
                      />
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className={
                        canSave
                          ? "bg-background text-foreground"
                          : "bg-destructive text-white"
                      }
                      arrowClassName={
                        canSave
                          ? "bg-background fill-background"
                          : "bg-destructive fill-destructive"
                      }
                    >
                      {canSave
                        ? "Klik om student op te slaan"
                        : "Vul een geldig e-mailadres in om op te slaan."}
                    </TooltipContent>
                  </Tooltip>
                )}
              />
              {showSuccess && (
                <span
                  className="animate-fade-in mt-2 block text-sm text-green-600"
                  role="status"
                >
                  Student succesvol toegevoegd!
                </span>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
