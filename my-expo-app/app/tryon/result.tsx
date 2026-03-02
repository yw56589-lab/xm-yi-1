import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, Text, View } from "react-native";

import { Badge, Button, GlassPanel, MobileHeader, MobileShell } from "@/src/components/ui";
import { useTryOnSession } from "@/src/features/tryon/session-context";
import { getSizeRecommendation, getTryOnResult } from "@/src/services/tryon";

export default function ResultPage() {
  const { session, setResult, setSizeRecommendation, resetFlow } = useTryOnSession();
  const [selectedResultId, setSelectedResultId] = useState(session.top_result_id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session.job_id) {
      router.replace("/(tabs)/products" as never);
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
    <MobileShell>
      <MobileHeader title="试衣结果" subtitle="候选切换与尺码解释" backHref="/(tabs)/products" />

      <GlassPanel contentClassName="px-4 py-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-[16px] font-semibold text-[#26221D]">Top1 试穿图</Text>
          <Badge label={loading ? "加载中" : `评分 ${(selectedCandidate?.score ?? 0).toFixed(2)}`} tone="assist" />
        </View>
        <View className="h-64 items-center justify-center rounded-[18px] bg-white/50">
          <Ionicons name="image-outline" size={46} color="#4E463C" />
          <Text className="mt-2 text-[13px] text-[#5F564B]">{selectedCandidate ? selectedCandidate.label : "候选占位"}</Text>
        </View>
        <View className="mt-3 flex-row gap-2">
          {(session.candidates ?? []).map((candidate, index) => (
            <Button
              key={candidate.result_id}
              label={`候选 ${index + 1}`}
              variant={selectedResultId === candidate.result_id ? "default" : "outline"}
              onPress={() => setSelectedResultId(candidate.result_id)}
              className={selectedResultId === candidate.result_id ? "flex-1" : "flex-1 border-white/80 bg-white/55"}
            />
          ))}
        </View>
      </GlassPanel>

      <GlassPanel className="mt-4" contentClassName="px-4 py-4">
        <Text className="text-[16px] font-semibold text-[#26221D]">
          推荐尺码：{recommendation?.recommended_size ?? "-"}
        </Text>
        <Text className="mt-2 text-[13px] leading-5 text-[#665D52]">
          {recommendation?.explanation ?? "正在加载尺码解释..."}
        </Text>
        <View className="mt-3 gap-1">
          <Text className="text-[12px] text-[#675E53]">胸围余量：{recommendation?.fit_margins.bust_margin_cm ?? "-"} cm</Text>
          <Text className="text-[12px] text-[#675E53]">腰围余量：{recommendation?.fit_margins.waist_margin_cm ?? "-"} cm</Text>
          <Text className="text-[12px] text-[#675E53]">臀围余量：{recommendation?.fit_margins.hip_margin_cm ?? "-"} cm</Text>
          <Text className="text-[12px] text-[#675E53]">肩宽余量：{recommendation?.fit_margins.shoulder_margin_cm ?? "-"} cm</Text>
        </View>
      </GlassPanel>

      <View className="mt-4 gap-2">
        <Button
          label="返回商品页"
          variant="outline"
          onPress={() => router.replace("/(tabs)/products" as never)}
          icon={<Ionicons name="shirt-outline" size={16} color="#71717A" />}
          className="border-white/80 bg-white/55"
        />
        <Button
          label="重置本次试衣流程"
          variant="ghost"
          onPress={() => {
            resetFlow();
            router.replace("/(tabs)/home" as never);
          }}
          icon={<Ionicons name="refresh-outline" size={16} color="#71717A" />}
          className="border border-white/70 bg-white/45"
        />
      </View>
    </MobileShell>
  );
}
