import { Text, View } from "react-native";

type TryOnPreviewPlaceholderProps = {
  title?: string;
  subtitle?: string;
};

export function TryOnPreviewPlaceholder({
  title = "试穿预览占位",
  subtitle = "后续替换为真实生成图和热力图叠层",
}: TryOnPreviewPlaceholderProps) {
  return (
    <View className="rounded-[10px] border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-900">
      <View
        className="items-center justify-center rounded-[10px] border border-dashed border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800"
        style={{ height: 240 }}
      >
        <Text className="text-body-md text-zinc-700 dark:text-zinc-200">{title}</Text>
        <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">{subtitle}</Text>
      </View>
    </View>
  );
}
