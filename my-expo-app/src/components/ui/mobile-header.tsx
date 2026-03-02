import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { GlassPanel } from "./glass-panel";

type MobileHeaderProps = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  backHref?: string;
};

export function MobileHeader({ title, subtitle, right, backHref = "/(tabs)/home" }: MobileHeaderProps) {
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace(backHref as never);
  };

  return (
    <View className="mb-4 gap-3">
      <GlassPanel intensity={100} contentClassName="px-4 py-3">
        <View className="flex-row items-center">
          <Pressable
            onPress={goBack}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.55)" }}
          >
            <Ionicons name="chevron-back" size={20} color="#2F2C28" />
          </Pressable>
          <Text className="ml-3 text-[20px] font-semibold text-[#23201C] dark:text-zinc-50">{title}</Text>
          <View className="ml-auto">{right}</View>
        </View>
      </GlassPanel>
      {subtitle ? <Text className="px-2 text-[13px] text-[#5A5249] dark:text-zinc-300">{subtitle}</Text> : null}
    </View>
  );
}
