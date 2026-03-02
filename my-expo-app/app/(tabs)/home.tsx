import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { Button, GlassPanel, MobileHeader, MobileShell } from "@/src/components/ui";
import { homePushFeed } from "@/src/features/tryon/mock-data";
import { useTryOnSession } from "@/src/features/tryon/session-context";

export default function HomeTabPage() {
  const { session } = useTryOnSession();
  const [keyword, setKeyword] = useState("");
  const currentModel = session.models.find((item) => item.model_id === session.active_model_id);

  const pushes = useMemo(() => {
    if (!keyword.trim()) return homePushFeed;
    const q = keyword.trim().toLowerCase();
    return homePushFeed.filter(
      (item) => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q),
    );
  }, [keyword]);

  return (
    <MobileShell>
      <MobileHeader title="首页" subtitle="搜索、建模与推送卡片已按新版结构排布" />

      <GlassPanel className="mb-4" contentClassName="px-4 py-3">
        <View className="h-10 flex-row items-center gap-2 rounded-full border border-white/70 px-3">
          <Ionicons name="search-outline" size={18} color="#4B463F" />
          <TextInput
            className="flex-1 text-[14px] text-[#2A2621]"
            placeholder="搜索推送或关键词"
            placeholderTextColor="#6E665B"
            value={keyword}
            onChangeText={setKeyword}
            returnKeyType="search"
          />
          <Pressable
            className="h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.58)" }}
          >
            <Ionicons name="options-outline" size={16} color="#4B463F" />
          </Pressable>
        </View>
      </GlassPanel>

      <View className="mb-4 flex-row gap-3">
        <GlassPanel className="flex-1" contentClassName="px-4 py-4">
          <View className="gap-3">
            <View className="h-11 w-11 items-center justify-center rounded-full bg-[#F4EFE7]">
              <Ionicons name="construct-outline" size={20} color="#352F27" />
            </View>
            <Text className="text-[16px] font-semibold text-[#26221D]">3D 模型建立</Text>
            <Text className="text-[12px] leading-5 text-[#645B50]">管理你的身体参数模型，可随时编辑、删除和复用。</Text>
            <Button
              label="进入管理"
              variant="outline"
              onPress={() => router.push("/tryon/profile" as never)}
              className="border-white/80 bg-white/50"
            />
          </View>
        </GlassPanel>

        <GlassPanel className="flex-1" contentClassName="px-4 py-4">
          <View className="items-center gap-3">
            <View className="h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-[#F8F4EC]">
              <Text className="text-[32px]">{currentModel ? "🧍" : "🙂"}</Text>
            </View>
            <Text className="text-[14px] font-semibold text-[#26221D]">
              {currentModel ? currentModel.model_name : "还没有建立模型"}
            </Text>
            <Text className="text-center text-[12px] leading-5 text-[#645B50]">
              {currentModel ? "Q 版展示已绑定当前模型，可直接用于试衣。" : "先建立模型，这里会自动展示你的 Q 版人体。"}
            </Text>
          </View>
        </GlassPanel>
      </View>

      <Text className="mb-3 px-2 text-[16px] font-semibold text-[#2A2621]">推送</Text>
      <View className="gap-3">
        {pushes.map((item) => (
          <GlassPanel key={item.id} contentClassName="px-4 py-4">
            <View className="gap-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-[16px] font-semibold text-[#26221D]">{item.title}</Text>
                <View className="rounded-full bg-white/70 px-3 py-1">
                  <Text className="text-[12px] text-[#4E473E]">{item.badge}</Text>
                </View>
              </View>
              <Text className="text-[13px] leading-5 text-[#665D52]">{item.subtitle}</Text>
              <Pressable className="mt-1 flex-row items-center gap-1 self-start">
                <Text className="text-[13px] font-medium text-[#332D25]">查看详情</Text>
                <Ionicons name="arrow-forward" size={14} color="#332D25" />
              </Pressable>
            </View>
          </GlassPanel>
        ))}
      </View>
    </MobileShell>
  );
}
