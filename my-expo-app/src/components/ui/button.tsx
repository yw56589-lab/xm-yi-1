import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { Pressable, Text, type PressableProps } from "react-native";

import { cn } from "@/src/lib/cn";

const buttonVariants = cva(
  "h-10 flex-row items-center justify-center gap-2 rounded-[10px] border px-4",
  {
    variants: {
      variant: {
        default:
          "border-brand bg-brand active:bg-brand-dark dark:border-brand-dark dark:bg-brand-dark dark:active:bg-brand",
        outline: "border-zinc-200 bg-white active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:active:bg-zinc-800",
        ghost: "border-transparent bg-transparent active:bg-zinc-100 dark:active:bg-zinc-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const textVariants = cva("text-body-sm font-semibold", {
  variants: {
    variant: {
      default: "text-white dark:text-zinc-900",
      outline: "text-zinc-900 dark:text-zinc-100",
      ghost: "text-zinc-900 dark:text-zinc-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ButtonProps = PressableProps &
  VariantProps<typeof buttonVariants> & {
    label: string;
    icon?: ReactNode;
    className?: string;
  };

export function Button({ label, icon, className, variant, ...props }: ButtonProps) {
  return (
    <Pressable {...props} className={cn(buttonVariants({ variant }), className)}>
      {icon}
      <Text className={textVariants({ variant })}>{label}</Text>
    </Pressable>
  );
}
