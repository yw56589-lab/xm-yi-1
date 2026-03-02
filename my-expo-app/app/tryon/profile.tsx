import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Text, View } from "react-native";

import { AppShell, Button, Card, Chip, Input, SectionHeader } from "@/src/components/ui";
import { bodyTemplates } from "@/src/features/tryon/mock-data";
import { useTryOnSession } from "@/src/features/tryon/session-context";
import type { Profile3DInput } from "@/src/features/tryon/types";
import { saveProfile } from "@/src/services/tryon";

const defaultForm: Profile3DInput = {
  source: "template",
  gender: "female",
  height_cm: 165,
  shoulder_cm: 39,
  bust_cm: 84,
  waist_cm: 68,
  hip_cm: 90,
  arm_len_cm: 56,
};

export default function ProfilePage() {
  const { session, setProfile, setActiveModel } = useTryOnSession();
  const [selectedTemplate, setSelectedTemplate] = useState(bodyTemplates[0].id);
  const [unit, setUnit] = useState<"cm" | "inch">("cm");
  const [saving, setSaving] = useState(false);
  const [modelName, setModelName] = useState(`人体模型 ${Math.min(session.models.length + 1, 3)}`);
  const [form, setForm] = useState<Profile3DInput>(session.profile ?? defaultForm);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof Profile3DInput, string>> = {};
    if (form.height_cm < 130 || form.height_cm > 210) next.height_cm = "身高范围应在130-210cm";
    if (form.bust_cm < 60 || form.bust_cm > 130) next.bust_cm = "胸围范围应在60-130cm";
    if (form.waist_cm < 50 || form.waist_cm > 120) next.waist_cm = "腰围范围应在50-120cm";
    if (form.hip_cm < 70 || form.hip_cm > 140) next.hip_cm = "臀围范围应在70-140cm";
    if (form.shoulder_cm < 30 || form.shoulder_cm > 55) next.shoulder_cm = "肩宽范围应在30-55cm";
    return next;
  }, [form]);

  const updateNumber = (key: keyof Profile3DInput, value: string) => {
    const n = Number(value);
    if (Number.isNaN(n)) return;
    setForm((prev) => ({ ...prev, [key]: n }));
  };

  const onSaveModel = async () => {
    if (Object.keys(errors).length > 0) {
      Alert.alert("参数不完整", "请先修正输入项。");
      return;
    }
    if (session.models.length >= 3 && !session.active_model_id) {
      Alert.alert("模型数量已满", "最多保存 3 个人体模型，请先选择一个模型编辑。");
      return;
    }

    setSaving(true);
    try {
      const payload: Profile3DInput = {
        ...form,
        source: selectedTemplate ? "template" : "manual",
      };
      const res = await saveProfile(payload);
      setProfile(payload, res.profile_id, selectedTemplate, modelName.trim() || "人体模型");
      Alert.alert("保存成功", "人体模型已保存并设为当前模型。");
      router.back();
    } catch (error) {
      const message = error instanceof Error ? error.message : "保存失败";
      Alert.alert("保存失败", message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell>
      <SectionHeader title="三维人体模型管理" subtitle="模型通常建立 1-3 个即可，后续试衣直接复用。" />

      <Card className="gap-4">
        <Text className="text-h2 text-zinc-950 dark:text-zinc-50">已保存模型</Text>
        {session.models.length === 0 ? (
          <Text className="text-body-sm text-zinc-500 dark:text-zinc-400">暂无模型，请创建第一个人体模型。</Text>
        ) : (
          <View className="gap-2">
            {session.models.map((model) => (
              <View
                key={model.model_id}
                className="h-10 rounded-[10px] border border-zinc-200 bg-white px-3 flex-row items-center justify-between dark:border-zinc-700 dark:bg-zinc-900"
              >
                <Text className="text-body-sm text-zinc-900 dark:text-zinc-100">{model.model_name}</Text>
                <Button
                  label={session.active_model_id === model.model_id ? "当前使用中" : "设为当前"}
                  variant={session.active_model_id === model.model_id ? "default" : "outline"}
                  onPress={() => setActiveModel(model.model_id)}
                />
              </View>
            ))}
          </View>
        )}
      </Card>

      <Card className="gap-4">
        <Text className="text-h2 text-zinc-950 dark:text-zinc-50">创建新模型</Text>
        <Input label="模型名称" value={modelName} onChangeText={setModelName} hint="建议命名：本人-春夏 / 家人-通勤" />

        <View className="flex-row flex-wrap gap-2">
          {bodyTemplates.map((template) => (
            <Chip
              key={template.id}
              label={template.name}
              active={selectedTemplate === template.id}
              onPress={() => setSelectedTemplate(template.id)}
            />
          ))}
        </View>

        <View className="flex-row gap-2">
          <Chip label="厘米 cm" active={unit === "cm"} onPress={() => setUnit("cm")} />
          <Chip label="英寸 inch" active={unit === "inch"} onPress={() => setUnit("inch")} />
        </View>

        <Input
          label="身高"
          keyboardType="numeric"
          value={String(form.height_cm)}
          onChangeText={(value) => updateNumber("height_cm", value)}
          error={errors.height_cm}
        />
        <Input
          label="肩宽"
          keyboardType="numeric"
          value={String(form.shoulder_cm)}
          onChangeText={(value) => updateNumber("shoulder_cm", value)}
          error={errors.shoulder_cm}
        />
        <Input
          label="胸围"
          keyboardType="numeric"
          value={String(form.bust_cm)}
          onChangeText={(value) => updateNumber("bust_cm", value)}
          error={errors.bust_cm}
        />
        <Input
          label="腰围"
          keyboardType="numeric"
          value={String(form.waist_cm)}
          onChangeText={(value) => updateNumber("waist_cm", value)}
          error={errors.waist_cm}
        />
        <Input
          label="臀围"
          keyboardType="numeric"
          value={String(form.hip_cm)}
          onChangeText={(value) => updateNumber("hip_cm", value)}
          error={errors.hip_cm}
        />
        <Input
          label="臂长"
          keyboardType="numeric"
          value={String(form.arm_len_cm ?? 0)}
          onChangeText={(value) => updateNumber("arm_len_cm", value)}
        />

        <Button
          label={saving ? "保存中..." : "保存人体模型"}
          onPress={onSaveModel}
          disabled={saving}
          icon={<Ionicons name="save-outline" size={16} color="#FFFFFF" />}
        />
      </Card>
    </AppShell>
  );
}
