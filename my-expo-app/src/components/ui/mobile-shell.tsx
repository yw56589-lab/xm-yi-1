import type { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MobileShellProps = PropsWithChildren<{
  scroll?: boolean;
  contentClassName?: string;
}>;

export function MobileShell({ children, scroll = true, contentClassName }: MobileShellProps) {
  const content = <View className={`px-4 pt-2 pb-28 ${contentClassName ?? ""}`}>{children}</View>;

  return (
    <SafeAreaView className="flex-1 bg-[#E7E1D7] dark:bg-zinc-950">
      <View className="absolute -top-16 -right-20 h-64 w-64 rounded-full bg-[#CFC4B2] opacity-60 dark:bg-zinc-800" />
      <View className="absolute top-48 -left-24 h-56 w-56 rounded-full bg-[#D9D1C3] opacity-55 dark:bg-zinc-900" />
      <View className="absolute bottom-20 right-6 h-40 w-40 rounded-full bg-[#CDC0AE] opacity-55 dark:bg-zinc-800" />
      {scroll ? (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 8 }}>
          {content}
        </ScrollView>
      ) : (
        <View className="flex-1">{content}</View>
      )}
    </SafeAreaView>
  );
}
