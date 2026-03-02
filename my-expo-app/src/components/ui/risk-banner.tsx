import { Text, View } from "react-native";

type RiskBannerProps = {
  confidence: "high" | "medium" | "low";
};

const copyMap = {
  high: {
    title: "结果可信度高",
    desc: "推荐直接采用当前尺码建议。",
  },
  medium: {
    title: "结果可信度中等",
    desc: "建议结合个人穿着偏好决定。",
  },
  low: {
    title: "结果可信度偏低",
    desc: "建议调整参数后重新生成。",
  },
} as const;

export function RiskBanner({ confidence }: RiskBannerProps) {
  const copy = copyMap[confidence];
  const toneClass =
    confidence === "low"
      ? "border-brand bg-brand/10 dark:bg-brand-dark/20"
      : "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <View className={`rounded-[10px] border p-6 ${toneClass}`}>
      <Text className="text-h2 text-zinc-950 dark:text-zinc-50">{copy.title}</Text>
      <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">{copy.desc}</Text>
    </View>
  );
}
