import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { GlassPanel, MobileHeader, MobileShell } from "@/src/components/ui";
import { garments } from "@/src/features/tryon/mock-data";
import { useTryOnSession } from "@/src/features/tryon/session-context";
import type { ProductGroup } from "@/src/features/tryon/types";

type Filter = "全部" | ProductGroup;

const coverColorMap: Record<string, string> = {
  "mist-blue": "#BFD0DF",
  "stone-gray": "#CDCCC8",
  sage: "#B4C1AE",
  "warm-ivory": "#E5DDCF",
  ink: "#6D6C70",
  sunset: "#E1A97A",
};

export default function ProductsTabPage() {
  const { session, toggleFavorite } = useTryOnSession();
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState<Filter>("全部");

  const list = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return garments.filter((item) => {
      const byFilter = filter === "全部" || item.group === filter;
      const byKeyword = !q || item.title.toLowerCase().includes(q);
      return byFilter && byKeyword;
    });
  }, [filter, keyword]);

  return (
    <MobileShell>
      <MobileHeader title="商品" subtitle="商品页移除建模入口，仅保留检索与商品库滑动浏览" />

      <GlassPanel className="mb-4" contentClassName="px-4 py-3">
        <View className="h-10 flex-row items-center gap-2 rounded-full border border-white/70 px-3">
          <Ionicons name="search-outline" size={18} color="#4B463F" />
          <TextInput
            className="flex-1 text-[14px] text-[#2A2621]"
            placeholder="搜索商品"
            placeholderTextColor="#6E665B"
            value={keyword}
            onChangeText={setKeyword}
            returnKeyType="search"
          />
        </View>
        <View className="mt-3 flex-row gap-2">
          {(["全部", "衬衫", "上衣"] as Filter[]).map((item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              className="h-10 items-center justify-center rounded-full px-4"
              style={{
                backgroundColor: filter === item ? "#201D19" : "rgba(255,255,255,0.56)",
              }}
            >
              <Text className={`text-[13px] font-medium ${filter === item ? "text-white" : "text-[#3E382F]"}`}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </GlassPanel>

      <View className="mb-4 flex-row flex-wrap gap-3">
        {list.map((item) => {
          const isFav = session.favorites.includes(item.garment_id);
          return (
            <Pressable
              key={item.garment_id}
              onPress={() => router.push(`/product/${item.garment_id}` as never)}
              className="w-[48.2%]"
            >
              <GlassPanel contentClassName="px-3 py-3">
                <View
                  className="h-32 items-center justify-center rounded-[18px]"
                  style={{ backgroundColor: coverColorMap[item.cover] ?? "#D7D2CA" }}
                >
                  <Ionicons name="shirt-outline" size={32} color="#2F2B25" />
                </View>
                <View className="mt-3 flex-row items-start justify-between">
                  <View className="flex-1 pr-1">
                    <Text className="text-[14px] font-semibold text-[#2A2621]">{item.title}</Text>
                    <Text className="text-[12px] text-[#665D52]">¥{item.price}</Text>
                  </View>
                  <Pressable onPress={() => toggleFavorite(item.garment_id)} className="h-8 w-8 items-center justify-center">
                    <Ionicons name={isFav ? "heart" : "heart-outline"} size={18} color={isFav ? "#D12C4A" : "#3E382F"} />
                  </Pressable>
                </View>
              </GlassPanel>
            </Pressable>
          );
        })}
      </View>

      <Text className="mb-3 px-2 text-[16px] font-semibold text-[#2A2621]">商品库滑动翻阅</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-3 pb-2">
          {garments.map((item) => (
            <Pressable key={`shelf-${item.garment_id}`} onPress={() => router.push(`/product/${item.garment_id}` as never)}>
              <GlassPanel className="w-44" contentClassName="px-3 py-3">
                <View
                  className="h-24 items-center justify-center rounded-[16px]"
                  style={{ backgroundColor: coverColorMap[item.cover] ?? "#D7D2CA" }}
                >
                  <Ionicons name="sparkles-outline" size={20} color="#2F2B25" />
                </View>
                <Text className="mt-2 text-[13px] font-medium text-[#2A2621]">{item.title}</Text>
                <Text className="text-[12px] text-[#665D52]">¥{item.price}</Text>
              </GlassPanel>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </MobileShell>
  );
}
