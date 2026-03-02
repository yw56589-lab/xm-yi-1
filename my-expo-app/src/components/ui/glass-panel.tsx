import { BlurView } from "expo-blur";
import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { cn } from "@/src/lib/cn";

import { NoiseOverlay } from "./noise-overlay";

type GlassPanelProps = PropsWithChildren<{
  className?: string;
  contentClassName?: string;
  intensity?: number;
}>;

export function GlassPanel({ children, className, contentClassName, intensity = 95 }: GlassPanelProps) {
  return (
    <View
      className={cn("overflow-hidden rounded-[24px] border", className)}
      style={{
        borderColor: "rgba(255,255,255,0.5)",
        backgroundColor: "rgba(255,255,255,0.12)",
      }}
    >
      <BlurView intensity={intensity} tint="light" style={StyleSheet.absoluteFillObject} />
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: "rgba(255,255,255,0.16)" }]} />
      <NoiseOverlay density={140} opacity={0.08} />
      <View className={cn("p-4", contentClassName)}>{children}</View>
    </View>
  );
}
