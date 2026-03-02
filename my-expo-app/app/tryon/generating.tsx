import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";

import {
  AppShell,
  Button,
  Card,
  SectionHeader,
  StepProgress,
  TryOnPreviewPlaceholder,
} from "@/src/components/ui";
import { useTryOnSession } from "@/src/features/tryon/session-context";
import { getTryOnStatus } from "@/src/services/tryon";

export default function GeneratingPage() {
  const { session, setJobState } = useTryOnSession();
  const [busy, setBusy] = useState(true);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (!session.job_id) {
      router.replace("/tryon/garment" as never);
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const poll = async () => {
      if (!session.job_id || cancelledRef.current) return;
      try {
        const job = await getTryOnStatus(session.job_id);
        setJobState(job);
        if (job.status === "succeeded") {
          setBusy(false);
          router.replace("/tryon/result" as never);
          return;
        }
        if (job.status === "failed") {
          setBusy(false);
          Alert.alert("生成失败", "请返回上一步调整参数后重试。");
          return;
        }
      } catch {
        setBusy(false);
        Alert.alert("网络异常", "状态获取失败，请稍后重试。");
        return;
      }
      timer = setTimeout(() => void poll(), 900);
    };

    void poll();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [session.job_id, setJobState]);

  const cancel = () => {
    cancelledRef.current = true;
    router.replace("/tryon/garment" as never);
  };

  return (
    <AppShell>
      <SectionHeader title="试穿生成中" subtitle="步骤 3/4 · 阶段进度与占位预览" />
      <StepProgress steps={["输入", "选衣", "生成", "结果"]} activeIndex={2} />

      <Card className="gap-4">
        <Text className="text-h2 text-zinc-950 dark:text-zinc-50">
          阶段: {session.job?.stage ?? "aligning"}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">
            进度: {session.job?.progress ?? 0}%
          </Text>
          <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">
            重试次数: {session.job?.retries ?? 0}
          </Text>
        </View>
        <View className="h-1 rounded-[10px] bg-zinc-200 dark:bg-zinc-700">
          <View
            className="h-1 rounded-[10px] bg-brand dark:bg-brand-dark"
            style={{ width: `${session.job?.progress ?? 0}%` }}
          />
        </View>
      </Card>

      <TryOnPreviewPlaceholder title="试穿预览图占位" subtitle="候选图 2 张 · 质量评分占位" />

      <Button
        label={busy ? "取消生成" : "返回服装选择"}
        variant="outline"
        onPress={cancel}
        icon={<Ionicons name="close-outline" size={16} color="#71717A" />}
      />
    </AppShell>
  );
}
