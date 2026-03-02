import "../global.css";
import "react-native-reanimated";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { TryOnSessionProvider } from "@/src/features/tryon/session-context";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TryOnSessionProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colorScheme === "dark" ? "#09090B" : "#FFFFFF" },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" />
          <Stack.Screen name="tryon/profile" />
          <Stack.Screen name="tryon/result" />
        </Stack>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </TryOnSessionProvider>
    </GestureHandlerRootView>
  );
}
