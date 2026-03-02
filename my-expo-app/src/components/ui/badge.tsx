import { Text, View } from "react-native";

import { cn } from "@/src/lib/cn";

type BadgeProps = {
  label: string;
  tone?: "default" | "assist";
};

export function Badge({ label, tone = "default" }: BadgeProps) {
  return (
    <View
      className={cn(
        "h-6 items-center justify-center rounded-[10px] border px-2",
        tone === "default"
          ? "border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800"
          : "border-sky-assist/30 bg-sky-assist/10",
      )}
    >
      <Text className="text-caption text-zinc-700 dark:text-zinc-200">{label}</Text>
    </View>
  );
}
