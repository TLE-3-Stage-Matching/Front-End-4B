import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useLoginForm } from "@/hooks/user.form";
import { UserSchema } from "@/types/user";
import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/example")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useLoginForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: UserSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <section className="mx-auto w-[80vw] py-16">
      <form
        className="py-3"
        id="login"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.AppField
            name="name"
            children={(field) => <field.EmailField label="email" />}
          />
        </FieldGroup>
      </form>
      <Button type="submit" form="login">
        Create
      </Button>
      <Card hoverable variant="accent">
        <CardHeader>
          <CardTitle>Test</CardTitle>
          <CardDescription>Hello</CardDescription>
          <CardAction>
            <Button variant="default">default</Button>
            <Button variant="secondary">secondary</Button>
            <Button variant="tertiary">tertiary</Button>
            <Button variant="destructive">destructive</Button>
            <Button variant="outline">outline</Button>
            <Button variant="ghost">ghost</Button>
            <Button variant="link">link</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          Laborum aliqua ex excepteur tempor ea consectetur incididunt commodo
          in esse consectetur fugiat velit. Ullamco deserunt ullamco pariatur
          quis laboris nostrud deserunt amet commodo id esse. Commodo cupidatat
          dolor exercitation. Proident anim fugiat amet do anim ut laborum duis
          occaecat do esse ex dolore minim ex. Aliqua amet Lorem adipisicing
          labore ipsum sit veniam ullamco mollit tempor. Ullamco mollit aliquip
          aliquip magna nostrud pariatur.
        </CardContent>
        <CardFooter>
          <Button variant="default" className="ml-auto">
            default
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
