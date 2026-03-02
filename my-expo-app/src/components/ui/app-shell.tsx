import type { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-950">
      <ScrollView className="flex-1" contentContainerStyle={{ alignItems: "center" }}>
        <View className="w-full px-6 py-6 gap-4" style={{ maxWidth: 1200 }}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
