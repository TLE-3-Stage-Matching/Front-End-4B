import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "flex flex-col gap-6 border py-6 shadow-sm transition-colors",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        secondary: "bg-primary text-card",
        dark: "bg-secondary text-card",
        accent: "bg-light-cyan text-card",
      },
      corner: {
        tl: "rounded-tl-xl",
        tr: "rounded-tr-xl",
        bl: "rounded-bl-xl",
        br: "rounded-br-xl",
      },
      hoverable: {
        true: "cursor-pointer",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        hoverable: true,
        className: "hover:text-primary",
      },
      {
        variant: "secondary",
        hoverable: true,
        className: "hover:bg-secondary",
      },
      {
        variant: "dark",
        hoverable: true,
        className: "hover:bg-muted-red",
      },
      {
        variant: "accent",
        hoverable: true,
        className: "hover:bg-dark-teal",
      },
    ],
    defaultVariants: {
      variant: "default",
      corner: "br",
      hoverable: false,
    },
  },
);

function Card({
  className,
  variant = "default",
  corner = "br",
  hoverable = false,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      data-corner={corner}
      className={cn(cardVariants({ variant, corner, hoverable, className }))}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
