import { Dimensions, View } from "react-native";

type NoiseOverlayProps = {
  density?: number;
  opacity?: number;
};

export function NoiseOverlay({ density = 120, opacity = 0.1 }: NoiseOverlayProps) {
  const { width, height } = Dimensions.get("window");
  const dots = Array.from({ length: density }, (_, i) => ({
    key: `noise-dot-${i}`,
    left: ((((i * 17) % 100) / 100) * width) + 2,
    top: ((((i * 29) % 100) / 100) * height) + 2,
    size: (i % 3) + 1,
    alpha: opacity * (0.6 + ((i * 13) % 7) / 10),
  }));

  return (
    <View pointerEvents="none" className="absolute inset-0 overflow-hidden">
      {dots.map((dot) => (
        <View
          key={dot.key}
          style={{
            position: "absolute",
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            borderRadius: 999,
            backgroundColor: `rgba(255,255,255,${dot.alpha.toFixed(3)})`,
          }}
        />
      ))}
    </View>
  );
}
