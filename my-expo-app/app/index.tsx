import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, Card, Chip } from "@/src/components/ui";
import { garments } from "@/src/features/tryon/mock-data";
import { useTryOnSession } from "@/src/features/tryon/session-context";

type GroupFilter = "全部" | "衬衫" | "上衣";

export default function CatalogHomePage() {
  const { session } = useTryOnSession();
  const [keyword, setKeyword] = useState("");
  const [group, setGroup] = useState<GroupFilter>("全部");

  const filtered = useMemo(() => {
    return garments.filter((item) => {
      const byGroup = group === "全部" || item.group === group;
      const byKeyword = !keyword.trim() || item.title.toLowerCase().includes(keyword.trim().toLowerCase());
      return byGroup && byKeyword;
    });
  }, [group, keyword]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-950">
      <View className="mx-auto flex-1 w-full max-w-content px-6 py-6 gap-4">
        <View className="gap-2" style={{ maxHeight: "33%" }}>
          <Card className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-h2 text-zinc-950 dark:text-zinc-50">三维模型人体建立</Text>
              <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">
                已建 {session.models.length}/3
              </Text>
            </View>
            <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">
              模型建立通常只需一次，后续浏览不同衣物可直接复用。
            </Text>
            <Button
              label={session.models.length > 0 ? "管理人体模型" : "创建第一个人体模型"}
              variant="outline"
              onPress={() => router.push("/tryon/profile" as never)}
            />
          </Card>

          <View className="h-10 rounded-[10px] border border-zinc-200 bg-white px-3 flex-row items-center gap-2 dark:border-zinc-700 dark:bg-zinc-900">
            <Ionicons name="search-outline" size={16} color="#71717A" />
            <TextInput
              className="flex-1 text-body-sm text-zinc-900 dark:text-zinc-100"
              placeholder="在衣服库中搜索（如：衬衫1）"
              placeholderTextColor="#71717A"
              value={keyword}
              onChangeText={setKeyword}
              returnKeyType="search"
            />
          </View>

          <View className="flex-row gap-2">
            {(["全部", "衬衫", "上衣"] as GroupFilter[]).map((item) => (
              <Chip key={item} label={item} active={group === item} onPress={() => setGroup(item)} />
            ))}
          </View>
        </View>

        <View className="flex-1 gap-4">
          <Text className="text-h2 text-zinc-950 dark:text-zinc-50">商品库</Text>
          <View className="flex-row flex-wrap gap-4">
            {filtered.map((item) => (
              <Link key={item.garment_id} href={`/product/${item.garment_id}` as never} asChild>
                <Pressable style={{ width: "48%" }}>
                  <Card className="gap-4">
                    <View className="h-32 rounded-[10px] border border-zinc-200 bg-zinc-100 items-center justify-center dark:border-zinc-700 dark:bg-zinc-800">
                      <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">商品图占位</Text>
                    </View>
                    <Text className="text-h2 text-zinc-950 dark:text-zinc-50">{item.title}</Text>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">分类: {item.group}</Text>
                      <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">适配: {item.fit_score}</Text>
                    </View>
                  </Card>
                </Pressable>
              </Link>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
