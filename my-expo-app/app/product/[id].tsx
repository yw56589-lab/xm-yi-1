import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, GlassPanel, MobileHeader } from "@/src/components/ui";
import { garments } from "@/src/features/tryon/mock-data";
import { useTryOnSession } from "@/src/features/tryon/session-context";
import { createTryOn } from "@/src/services/tryon";

const coverColorMap: Record<string, string> = {
  "mist-blue": "#BFD0DF",
  "stone-gray": "#CDCCC8",
  sage: "#B4C1AE",
  "warm-ivory": "#E5DDCF",
  ink: "#6D6C70",
  sunset: "#E1A97A",
};

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { session, setGarment, setJob, toggleFavorite } = useTryOnSession();
  const [size, setSize] = useState("L");
  const [trying, setTrying] = useState(false);

  const product = useMemo(() => garments.find((item) => item.garment_id === id), [id]);
  const isFav = product ? session.favorites.includes(product.garment_id) : false;

  const startTryOn = async () => {
    if (!product) return;
    const activeProfileId = session.active_model_id;
    if (!activeProfileId) {
      Alert.alert("请先创建人体模型", "请先去模型管理创建并设为当前模型，再开始 AI 试衣。", [
        { text: "去创建", onPress: () => router.push("/tryon/profile" as never) },
        { text: "取消", style: "cancel" },
      ]);
      return;
    }
    setTrying(true);
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
      setTrying(false);
    }
  };

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-[#E7E1D7] dark:bg-zinc-950 px-4 py-4">
        <MobileHeader title="商品详情" backHref="/(tabs)/products" />
        <GlassPanel contentClassName="items-center py-10">
          <Text className="text-[16px] font-semibold text-[#2A2621]">商品不存在</Text>
          <Pressable
            onPress={() => router.replace("/(tabs)/products" as never)}
            className="mt-4 h-10 rounded-full px-5 items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.62)" }}
          >
            <Text className="text-[13px] font-medium text-[#332D25]">返回商品页</Text>
          </Pressable>
        </GlassPanel>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#E7E1D7] dark:bg-zinc-950">
      <View className="absolute -top-16 -right-20 h-64 w-64 rounded-full bg-[#CFC4B2] opacity-60 dark:bg-zinc-800" />
      <View className="absolute bottom-20 -left-24 h-56 w-56 rounded-full bg-[#D9D1C3] opacity-55 dark:bg-zinc-900" />

      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 138 }}>
        <MobileHeader
          title="商品详情"
          backHref="/(tabs)/products"
          right={
            <Pressable
              onPress={() => toggleFavorite(product.garment_id)}
              className="h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.56)" }}
            >
              <Ionicons name={isFav ? "heart" : "heart-outline"} size={20} color={isFav ? "#D12C4A" : "#2F2B25"} />
            </Pressable>
          }
        />

        <GlassPanel contentClassName="px-4 py-4">
          <View
            className="h-72 items-center justify-center rounded-[20px]"
            style={{ backgroundColor: coverColorMap[product.cover] ?? "#D7D2CA" }}
          >
            <Ionicons name="shirt-outline" size={64} color="#2F2B25" />
          </View>

          <View className="mt-3 flex-row gap-2">
            {product.gallery.slice(0, 3).map((item, idx) => (
              <View
                key={`${product.garment_id}-gallery-${item}`}
                className="flex-1 rounded-[14px] px-2 py-3 items-center"
                style={{ backgroundColor: idx === 1 ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.48)" }}
              >
                <View
                  className="mb-2 h-10 w-full rounded-[10px]"
                  style={{ backgroundColor: coverColorMap[product.cover] ?? "#D7D2CA" }}
                />
                <Text className="text-[11px] text-[#544C41]">{item}</Text>
              </View>
            ))}
          </View>
        </GlassPanel>

        <GlassPanel className="mt-4" contentClassName="px-4 py-4">
          <Text className="text-[24px] font-bold text-[#22201C]">{product.title}</Text>
          <Text className="mt-2 text-[13px] leading-5 text-[#665D52]">{product.description}</Text>

          <View className="mt-4 flex-row flex-wrap gap-y-3">
            {product.intro_pairs.map((item) => (
              <View key={`${product.garment_id}-${item.label}`} className="w-1/2 pr-2">
                <Text className="text-[11px] text-[#6E665B]">{item.label}</Text>
                <Text className="mt-1 text-[13px] font-medium text-[#2D2822]">{item.value}</Text>
              </View>
            ))}
          </View>
        </GlassPanel>

        <GlassPanel className="mt-4" contentClassName="px-4 py-4">
          <Text className="text-[15px] font-semibold text-[#27231D]">码数选择</Text>
          <View className="mt-3 flex-row gap-2">
            {sizes.map((item) => (
              <Pressable
                key={item}
                onPress={() => setSize(item)}
                className="h-10 w-12 items-center justify-center rounded-[12px]"
                style={{
                  backgroundColor: size === item ? "#26221D" : "rgba(255,255,255,0.58)",
                }}
              >
                <Text className={`text-[13px] font-medium ${size === item ? "text-white" : "text-[#3D362D]"}`}>{item}</Text>
              </Pressable>
            ))}
          </View>
          <Button
            label={trying ? "AI 试衣准备中..." : "AI 试衣"}
            onPress={startTryOn}
            disabled={trying}
            className="mt-4"
            icon={<Ionicons name="sparkles-outline" size={16} color="#FFFFFF" />}
          />
        </GlassPanel>
      </ScrollView>

      <View className="absolute bottom-6 left-4 right-4">
        <GlassPanel intensity={100} contentClassName="px-4 py-3">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-[12px] text-[#665D52]">售价</Text>
              <Text className="text-[24px] font-bold text-[#1F1B17]">¥{product.price}</Text>
            </View>
            <Pressable
              onPress={() => toggleFavorite(product.garment_id)}
              className="h-11 flex-row items-center justify-center rounded-full px-4"
              style={{ backgroundColor: isFav ? "#2A241D" : "rgba(255,255,255,0.68)" }}
            >
              <Ionicons name={isFav ? "heart" : "heart-outline"} size={16} color={isFav ? "#FFFFFF" : "#2E2720"} />
              <Text className={`ml-2 text-[13px] font-semibold ${isFav ? "text-white" : "text-[#2E2720]"}`}>
                {isFav ? "已收藏" : "收藏"}
              </Text>
            </Pressable>
          </View>
        </GlassPanel>
      </View>
    </SafeAreaView>
  );
}
