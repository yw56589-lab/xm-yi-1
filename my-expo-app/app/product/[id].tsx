import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/src/components/ui";
import { garments } from "@/src/features/tryon/mock-data";
import { useTryOnSession } from "@/src/features/tryon/session-context";
import { createTryOn } from "@/src/services/tryon";

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { session, setGarment, setJob } = useTryOnSession();
  const [loading, setLoading] = useState(false);

  const product = useMemo(() => garments.find((item) => item.garment_id === id), [id]);

  const startTryOn = async () => {
    if (!product) return;
    const activeProfileId = session.active_model_id ?? session.profile_id;
    if (!activeProfileId) {
      Alert.alert("请先建立人体模型", "首次试衣前请先创建并选择一个人体模型。", [
        { text: "去创建", onPress: () => router.push("/tryon/profile" as never) },
        { text: "取消", style: "cancel" },
      ]);
      return;
    }
    setLoading(true);
    try {
      setGarment(product.garment_id, "regular");
      const job = await createTryOn({
        profile_id: activeProfileId,
        garment_id: product.garment_id,
        preferred_fit: "regular",
      });
      setJob(job.job_id);
      router.push("/tryon/result" as never);
    } catch (error) {
      const message = error instanceof Error ? error.message : "创建试衣任务失败";
      Alert.alert("试衣失败", message);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-zinc-950">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-h2 text-zinc-900 dark:text-zinc-50">商品不存在</Text>
          <Button label="返回商品列表" variant="outline" onPress={() => router.replace("/" as never)} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-950">
      <View className="flex-1 mx-auto w-full max-w-content px-6 py-6">
        <View className="flex-row items-center justify-between">
          <Button label="返回" variant="ghost" onPress={() => router.back()} />
          <Text className="text-h2 text-zinc-900 dark:text-zinc-50">{product.title}</Text>
          <View className="w-12" />
        </View>

        <View className="mt-4 h-72 rounded-[10px] border border-zinc-200 bg-zinc-100 items-center justify-center dark:border-zinc-700 dark:bg-zinc-800">
          <Ionicons name="shirt-outline" size={48} color="#71717A" />
          <Text className="text-body-sm text-zinc-500 dark:text-zinc-400 mt-2">商品主图占位</Text>
        </View>

        <View className="mt-4 gap-4 rounded-[10px] border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
          <Text className="text-display text-zinc-900 dark:text-zinc-50">¥ {99 + product.fit_score}</Text>
          <Text className="text-h2 text-zinc-900 dark:text-zinc-50">{product.title} · 常规款</Text>
          <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">
            商品详情页（示意）：支持规格切换、材质说明、版型信息与尺码建议入口。
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">分类: {product.group}</Text>
            <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">版型: {product.fit_type}</Text>
          </View>
        </View>
      </View>

      <View className="border-t border-zinc-200 px-6 py-4 dark:border-zinc-700">
        <Button
          label={loading ? "创建试衣中..." : "AI试衣入口"}
          onPress={startTryOn}
          disabled={loading}
          icon={<Ionicons name="sparkles-outline" size={16} color="#FFFFFF" />}
        />
      </View>
    </SafeAreaView>
  );
}
