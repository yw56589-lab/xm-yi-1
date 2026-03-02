import { View } from "react-native";

import { cn } from "@/src/lib/cn";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return <View className={cn("animate-pulse rounded-[10px] bg-zinc-200 dark:bg-zinc-700", className)} />;
}
