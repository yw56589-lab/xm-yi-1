import type { PropsWithChildren } from "react";
import { View } from "react-native";

import { cn } from "@/src/lib/cn";

type IconWrapProps = PropsWithChildren<{
  size?: 16 | 20;
  className?: string;
}>;

export function IconWrap({ size = 16, className, children }: IconWrapProps) {
  const boxClass = size === 20 ? "size-5" : "size-4";
  return (
    <View className={cn("items-center justify-center", boxClass, className)}>
      {children}
    </View>
  );
}
