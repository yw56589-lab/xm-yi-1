import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { GlassPanel, MobileHeader, MobileShell } from "@/src/components/ui";
import { garments } from "@/src/features/tryon/mock-data";
import { useTryOnSession } from "@/src/features/tryon/session-context";

const coverColorMap: Record<string, string> = {
  "mist-blue": "#BFD0DF",
  "stone-gray": "#CDCCC8",
  sage: "#B4C1AE",
  "warm-ivory": "#E5DDCF",
  ink: "#6D6C70",
  sunset: "#E1A97A",
};

export default function FavoritesTabPage() {
  const { session, removeFavorite } = useTryOnSession();
  const list = garments.filter((item) => session.favorites.includes(item.garment_id));

  return (
    <MobileShell>
      <MobileHeader title="收藏" subtitle="点击心形即可取消收藏，便于快速回看目标商品" />

      {list.length === 0 ? (
        <GlassPanel contentClassName="items-center px-6 py-8">
          <Ionicons name="heart-outline" size={32} color="#4E463C" />
          <Text className="mt-2 text-[16px] font-semibold text-[#2A2621]">还没有收藏商品</Text>
          <Text className="mt-1 text-center text-[13px] leading-5 text-[#665D52]">
            在商品页或详情页点击收藏，商品会出现在这里。
          </Text>
          <Pressable
            onPress={() => router.push("/(tabs)/products" as never)}
            className="mt-4 h-10 rounded-full px-5 items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.62)" }}
          >
            <Text className="text-[13px] font-medium text-[#332D25]">去逛商品</Text>
          </Pressable>
        </GlassPanel>
      ) : (
        <View className="gap-3">
          {list.map((item) => (
            <GlassPanel key={item.garment_id} contentClassName="px-4 py-3">
              <View className="flex-row items-center gap-3">
                <View
                  className="h-14 w-14 items-center justify-center rounded-[14px]"
                  style={{ backgroundColor: coverColorMap[item.cover] ?? "#D7D2CA" }}
                >
                  <Ionicons name="shirt-outline" size={20} color="#2F2B25" />
                </View>
                <View className="flex-1">
                  <Text className="text-[14px] font-semibold text-[#2A2621]">{item.title}</Text>
                  <Text className="text-[12px] text-[#665D52]">¥{item.price}</Text>
                </View>
                <Pressable onPress={() => router.push(`/product/${item.garment_id}` as never)} className="mr-2">
                  <Ionicons name="arrow-forward-circle-outline" size={22} color="#3B352D" />
                </Pressable>
                <Pressable onPress={() => removeFavorite(item.garment_id)}>
                  <Ionicons name="heart" size={20} color="#D12C4A" />
                </Pressable>
              </View>
            </GlassPanel>
          ))}
        </View>
      )}
    </MobileShell>
  );
}
