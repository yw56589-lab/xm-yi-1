import type { PropsWithChildren } from "react";
import { Pressable, View, type PressableProps } from "react-native";

import { cn } from "@/src/lib/cn";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ children, className }: CardProps) {
  return (
    <View
      className={cn(
        "rounded-[10px] border border-zinc-200 bg-white p-6 shadow-card dark:border-zinc-800 dark:bg-zinc-900",
        className,
      )}
    >
      {children}
    </View>
  );
}

type CardActionProps = PressableProps & {
  className?: string;
};

export function CardAction({ children, className, ...props }: CardActionProps) {
  return (
    <Pressable
      {...props}
      className={cn(
        "rounded-[10px] border border-zinc-200 bg-white p-6 shadow-card active:shadow-card-hover dark:border-zinc-800 dark:bg-zinc-900",
        className,
      )}
    >
      {children}
    </Pressable>
  );
}
