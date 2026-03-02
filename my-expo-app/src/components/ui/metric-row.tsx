import { Text, View } from "react-native";

type MetricRowProps = {
  title: string;
  secondaryA: string;
  secondaryB: string;
};

export function MetricRow({ title, secondaryA, secondaryB }: MetricRowProps) {
  return (
    <View className="gap-3">
      <Text className="text-h2 text-zinc-950 dark:text-zinc-50">{title}</Text>
      <View className="flex-row items-center justify-between">
        <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">{secondaryA}</Text>
        <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">{secondaryB}</Text>
      </View>
    </View>
  );
}
