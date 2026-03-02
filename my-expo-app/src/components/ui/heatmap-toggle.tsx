import { Switch, Text, View } from "react-native";

type HeatmapToggleProps = {
  enabled: boolean;
  onToggle: () => void;
};

export function HeatmapToggle({ enabled, onToggle }: HeatmapToggleProps) {
  return (
    <View className="flex-row items-center justify-between rounded-[10px] border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
      <View className="gap-1">
        <Text className="text-h2 text-zinc-950 dark:text-zinc-50">热力图</Text>
        <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">松紧度可视化占位</Text>
      </View>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: "#D4D4D8", true: "#DB2777" }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}
