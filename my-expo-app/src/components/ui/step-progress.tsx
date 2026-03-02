import { Text, View } from "react-native";

import { cn } from "@/src/lib/cn";

type StepProgressProps = {
  steps: string[];
  activeIndex: number;
};

export function StepProgress({ steps, activeIndex }: StepProgressProps) {
  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-2">
        {steps.map((step, index) => (
          <View key={step} className="flex-1 gap-1">
            <View
              className={cn(
                "h-1 rounded-[10px]",
                index <= activeIndex ? "bg-brand dark:bg-brand-dark" : "bg-zinc-200 dark:bg-zinc-700",
              )}
            />
            <Text
              className={cn(
                "text-caption",
                index <= activeIndex ? "text-zinc-800 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400",
              )}
              numberOfLines={1}
            >
              {step}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
