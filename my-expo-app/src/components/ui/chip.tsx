import { Pressable, Text, type PressableProps } from "react-native";

import { cn } from "@/src/lib/cn";

type ChipProps = PressableProps & {
  active?: boolean;
  label: string;
  className?: string;
};

export function Chip({ active, label, className, ...props }: ChipProps) {
  return (
    <Pressable
      {...props}
      className={cn(
        "h-10 rounded-[10px] border px-3 items-center justify-center",
        active
          ? "border-brand bg-brand/10 dark:border-brand-dark dark:bg-brand-dark/20"
          : "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900",
        className,
      )}
    >
      <Text
        className={cn(
          "text-body-sm font-medium",
          active ? "text-brand dark:text-brand-dark" : "text-zinc-700 dark:text-zinc-200",
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}
