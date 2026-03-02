import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, Text, View } from "react-native";

import {
  AppShell,
  Badge,
  Button,
  Card,
  HeatmapToggle,
  RiskBanner,
  SectionHeader,
  StepProgress,
  TryOnPreviewPlaceholder,
} from "@/src/components/ui";
import { useTryOnSession } from "@/src/features/tryon/session-context";
import { getSizeRecommendation, getTryOnResult } from "@/src/services/tryon";

export default function ResultPage() {
  const { session, setResult, setSizeRecommendation, toggleHeatmap, resetFlow } = useTryOnSession();
  const [selectedResultId, setSelectedResultId] = useState(session.top_result_id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session.job_id) {
      router.replace("/" as never);
      return;
    }
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [result, recommendation] = await Promise.all([
          getTryOnResult(session.job_id!),
          getSizeRecommendation(session.job_id!),
        ]);
        if (!mounted) return;
        setResult(result.top_result_id, result.candidates);
        setSelectedResultId(result.top_result_id);
        setSizeRecommendation(recommendation);
      } catch (error) {
        const message = error instanceof Error ? error.message : "结果获取失败";
        Alert.alert("加载失败", message);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void fetchData();
    return () => {
      mounted = false;
    };
  }, [session.job_id, setResult, setSizeRecommendation]);

  const recommendation = session.size_recommendation;
  const selectedCandidate = useMemo(
    () => session.candidates?.find((item) => item.result_id === selectedResultId) ?? session.candidates?.[0],
    [selectedResultId, session.candidates],
  );

  return (
    <AppShell>
      <SectionHeader title="试穿结果" subtitle="候选切换、热力图开关、尺码解释" />
      <StepProgress steps={["建模", "选商品", "AI试衣", "结果"]} activeIndex={3} />

      <Card className="gap-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-h2 text-zinc-950 dark:text-zinc-50">Top1 试穿图</Text>
          <Badge label={loading ? "加载中" : `评分 ${(selectedCandidate?.score ?? 0).toFixed(2)}`} tone="assist" />
        </View>
        <TryOnPreviewPlaceholder
          title={selectedCandidate ? selectedCandidate.label : "候选占位"}
          subtitle={session.heatmap_enabled ? "热力图叠层已开启（占位）" : "普通试穿图模式"}
        />
        <View className="flex-row gap-2">
          {(session.candidates ?? []).map((candidate, index) => (
            <Button
              key={candidate.result_id}
              label={`候选${index + 1}`}
              variant={selectedResultId === candidate.result_id ? "default" : "outline"}
              onPress={() => setSelectedResultId(candidate.result_id)}
              className="flex-1"
            />
          ))}
        </View>
      </Card>

      <HeatmapToggle enabled={session.heatmap_enabled} onToggle={toggleHeatmap} />

      <Card className="gap-4">
        <Text className="text-h2 text-zinc-950 dark:text-zinc-50">
          推荐尺码: {recommendation?.recommended_size ?? "-"}
        </Text>
        <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">
          {recommendation?.explanation ?? "正在加载尺码解释..."}
        </Text>
        <View className="gap-2">
          <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">
            胸围余量: {recommendation?.fit_margins.bust_margin_cm ?? "-"} cm
          </Text>
          <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">
            腰围余量: {recommendation?.fit_margins.waist_margin_cm ?? "-"} cm
          </Text>
          <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">
            臀围余量: {recommendation?.fit_margins.hip_margin_cm ?? "-"} cm
          </Text>
          <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">
            肩宽余量: {recommendation?.fit_margins.shoulder_margin_cm ?? "-"} cm
          </Text>
        </View>
      </Card>

      <RiskBanner confidence={recommendation?.confidence ?? "medium"} />

      <View className="gap-2">
        <Button
          label="返回商品列表"
          variant="outline"
          onPress={() => router.replace("/" as never)}
          icon={<Ionicons name="shirt-outline" size={16} color="#71717A" />}
        />
        <Button
          label="保存试穿记录（Mock）"
          onPress={() => Alert.alert("已保存", "试穿记录已保存到本地 mock。")}
          icon={<Ionicons name="save-outline" size={16} color="#FFFFFF" />}
        />
        <Button
          label="重置当前试衣流程"
          variant="ghost"
          onPress={() => {
            resetFlow();
            router.replace("/" as never);
          }}
          icon={<Ionicons name="refresh-outline" size={16} color="#71717A" />}
        />
      </View>
    </AppShell>
  );
}
