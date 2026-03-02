import { Text, View } from "react-native";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <View className="gap-1">
      <Text className="text-h1 text-zinc-950 dark:text-zinc-50">{title}</Text>
      {subtitle ? <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">{subtitle}</Text> : null}
    </View>
  );
}
