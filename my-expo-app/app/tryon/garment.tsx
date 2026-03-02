import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, Text, View } from "react-native";

import { AppShell, Badge, Button, Card, Chip, SectionHeader, StepProgress } from "@/src/components/ui";
import { useTryOnSession } from "@/src/features/tryon/session-context";
import type { Garment } from "@/src/features/tryon/types";
import { createTryOn, listGarments } from "@/src/services/tryon";

export default function GarmentPage() {
  const { session, setGarment, setJob } = useTryOnSession();
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [category, setCategory] = useState<"tops" | "dress" | "all">("all");
  const [style, setStyle] = useState<"daily" | "office" | "sport" | "all">("all");
  const [garments, setGarments] = useState<Garment[]>([]);
  const [selectedGarment, setSelectedGarment] = useState(session.garment_id);
  const [fit, setFit] = useState(session.preferred_fit);

  useEffect(() => {
    let mounted = true;
    const fetchGarments = async () => {
      setLoading(true);
      try {
        const data = await listGarments({
          category: category === "all" ? undefined : category,
          style: style === "all" ? undefined : style,
        });
        if (mounted) setGarments(data);
      } catch {
        if (mounted) Alert.alert("加载失败", "服装列表获取失败，请稍后重试。");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void fetchGarments();
    return () => {
      mounted = false;
    };
  }, [category, style]);

  const selectedDetail = useMemo(
    () => garments.find((item) => item.garment_id === selectedGarment),
    [garments, selectedGarment],
  );

  const startTryOn = async () => {
    if (!session.profile_id || !selectedGarment) {
      Alert.alert("缺少参数", "请先完成体型保存并选择服装。");
      return;
    }
    setStarting(true);
    try {
      setGarment(selectedGarment, fit);
      const { job_id } = await createTryOn({
        profile_id: session.profile_id,
        garment_id: selectedGarment,
        preferred_fit: fit,
      });
      setJob(job_id);
      router.push("/tryon/generating" as never);
    } catch (error) {
      const message = error instanceof Error ? error.message : "创建任务失败";
      Alert.alert("创建失败", message);
    } finally {
      setStarting(false);
    }
  };

  return (
    <AppShell>
      <SectionHeader title="服装选择" subtitle="步骤 2/4 · 分类筛选与试穿参数" />
      <StepProgress steps={["输入", "选衣", "生成", "结果"]} activeIndex={1} />

      <Card className="gap-4">
        <Text className="text-h2 text-zinc-950 dark:text-zinc-50">筛选条件</Text>
        <View className="flex-row flex-wrap gap-2">
          {["all", "tops", "dress"].map((item) => (
            <Chip
              key={item}
              label={item === "all" ? "全部品类" : item === "tops" ? "上装" : "连衣裙"}
              active={category === item}
              onPress={() => setCategory(item as typeof category)}
            />
          ))}
        </View>
        <View className="flex-row flex-wrap gap-2">
          {["all", "daily", "office", "sport"].map((item) => (
            <Chip
              key={item}
              label={item === "all" ? "全部风格" : item === "daily" ? "日常" : item === "office" ? "通勤" : "运动"}
              active={style === item}
              onPress={() => setStyle(item as typeof style)}
            />
          ))}
        </View>
        <View className="flex-row flex-wrap gap-2">
          {["regular", "loose", "slim"].map((item) => (
            <Chip
              key={item}
              label={item === "regular" ? "合身" : item === "loose" ? "宽松" : "紧身"}
              active={fit === item}
              onPress={() => setFit(item as typeof fit)}
            />
          ))}
        </View>
      </Card>

      {loading ? (
        <Card>
          <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">加载服装中...</Text>
        </Card>
      ) : (
        garments.map((garment) => (
          <Card key={garment.garment_id} className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-h2 text-zinc-950 dark:text-zinc-50">{garment.title}</Text>
              <Badge label={`适配 ${garment.fit_score}`} tone="assist" />
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">版型: {garment.fit_type}</Text>
              <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">风格: {garment.style}</Text>
            </View>
            <Button
              label={selectedGarment === garment.garment_id ? "已选择" : "选择此服装"}
              variant={selectedGarment === garment.garment_id ? "default" : "outline"}
              onPress={() => setSelectedGarment(garment.garment_id)}
              icon={
                <Ionicons
                  name={selectedGarment === garment.garment_id ? "checkmark-outline" : "shirt-outline"}
                  size={16}
                  color={selectedGarment === garment.garment_id ? "#FFFFFF" : "#71717A"}
                />
              }
            />
          </Card>
        ))
      )}

      <Card className="gap-4">
        <Text className="text-h2 text-zinc-950 dark:text-zinc-50">当前选择</Text>
        <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">
          {selectedDetail
            ? `${selectedDetail.title} · 版型 ${selectedDetail.fit_type} · 偏好 ${fit}`
            : "未选择服装"}
        </Text>
        <Button
          label={starting ? "创建任务中..." : "开始试穿"}
          onPress={startTryOn}
          disabled={!selectedGarment || !session.profile_id || starting}
          icon={<Ionicons name="sparkles-outline" size={16} color="#FFFFFF" />}
        />
      </Card>
    </AppShell>
  );
}
