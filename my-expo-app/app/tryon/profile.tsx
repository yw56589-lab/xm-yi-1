import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

import { Button, GlassPanel, Input, MobileHeader, MobileShell } from "@/src/components/ui";
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
  const { session, setProfile, setActiveModel, deleteModel } = useTryOnSession();

  const currentModel = session.models.find((item) => item.model_id === session.active_model_id);
  const [selectedTemplate, setSelectedTemplate] = useState(session.selected_template ?? bodyTemplates[0].id);
  const [unit, setUnit] = useState<"cm" | "inch">("cm");
  const [saving, setSaving] = useState(false);
  const [editingModelId, setEditingModelId] = useState<string | undefined>(session.active_model_id);
  const [modelName, setModelName] = useState(
    currentModel?.model_name ?? `人体模型 ${Math.min(session.models.length + 1, 3)}`,
  );
  const [form, setForm] = useState<Profile3DInput>(currentModel?.profile ?? session.profile ?? defaultForm);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof Profile3DInput, string>> = {};
    if (form.height_cm < 130 || form.height_cm > 210) next.height_cm = "身高范围应在 130-210cm";
    if (form.bust_cm < 60 || form.bust_cm > 130) next.bust_cm = "胸围范围应在 60-130cm";
    if (form.waist_cm < 50 || form.waist_cm > 120) next.waist_cm = "腰围范围应在 50-120cm";
    if (form.hip_cm < 70 || form.hip_cm > 140) next.hip_cm = "臀围范围应在 70-140cm";
    if (form.shoulder_cm < 30 || form.shoulder_cm > 55) next.shoulder_cm = "肩宽范围应在 30-55cm";
    return next;
  }, [form]);

  const updateNumber = (key: keyof Profile3DInput, value: string) => {
    const n = Number(value);
    if (Number.isNaN(n)) return;
    setForm((prev) => ({ ...prev, [key]: n }));
  };

  const onEditModel = (modelId: string) => {
    const picked = session.models.find((item) => item.model_id === modelId);
    if (!picked) return;
    setEditingModelId(modelId);
    setModelName(picked.model_name);
    setForm(picked.profile);
    setActiveModel(modelId);
  };

  const onDeleteModel = (modelId: string) => {
    Alert.alert("删除模型", "删除后不可恢复，确定要删除吗？", [
      { text: "取消", style: "cancel" },
      {
        text: "删除",
        style: "destructive",
        onPress: () => {
          deleteModel(modelId);
          if (editingModelId === modelId) {
            setEditingModelId(undefined);
            setModelName(`人体模型 ${Math.min(session.models.length, 3)}`);
            setForm(defaultForm);
          }
        },
      },
    ]);
  };

  const onSaveModel = async () => {
    if (Object.keys(errors).length > 0) {
      Alert.alert("参数不完整", "请先修正输入项");
      return;
    }

    if (!editingModelId && session.models.length >= 3) {
      Alert.alert("模型数量已满", "最多保存 3 个人体模型，请先编辑或删除已有模型。");
      return;
    }

    setSaving(true);
    try {
      const payload: Profile3DInput = {
        ...form,
        source: selectedTemplate ? "template" : "manual",
      };
      const res = await saveProfile(payload, editingModelId);
      const fallbackModelName = currentModel?.model_name ?? "人体模型";
      const finalModelName = modelName.trim() || fallbackModelName;
      setProfile(payload, res.profile_id, selectedTemplate, finalModelName);
      setEditingModelId(res.profile_id);
      Alert.alert("保存成功", editingModelId ? "模型已更新" : "模型已创建并设为当前");
    } catch (error) {
      const message = error instanceof Error ? error.message : "保存失败";
      Alert.alert("保存失败", message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <MobileShell>
      <MobileHeader title="人体模型管理" subtitle="模型保存后可直接复用，并支持编辑、删除" backHref="/(tabs)/home" />

      <GlassPanel className="mb-4" contentClassName="px-4 py-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-[16px] font-semibold text-[#26221D]">已保存模型</Text>
          <Text className="text-[12px] text-[#675E53]">{session.models.length}/3</Text>
        </View>

        {session.models.length === 0 ? (
          <Text className="text-[13px] text-[#675E53]">暂无模型，请创建第一个人体模型。</Text>
        ) : (
          <View className="gap-2">
            {session.models.map((model) => {
              const active = session.active_model_id === model.model_id;
              return (
                <View
                  key={model.model_id}
                  className="rounded-[14px] border border-white/70 bg-white/40 px-3 py-3"
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="text-[13px] font-semibold text-[#2A2621]">{model.model_name}</Text>
                    <Text className="text-[11px] text-[#6F675C]">{active ? "当前使用" : "可切换"}</Text>
                  </View>
                  <View className="mt-3 flex-row gap-2">
                    <Button
                      label={active ? "正在使用" : "设为使用"}
                      variant={active ? "default" : "outline"}
                      onPress={() => setActiveModel(model.model_id)}
                      className={active ? "flex-1" : "flex-1 border-white/80 bg-white/50"}
                    />
                    <Button
                      label="编辑"
                      variant="outline"
                      onPress={() => onEditModel(model.model_id)}
                      className="flex-1 border-white/80 bg-white/50"
                    />
                    <Pressable
                      onPress={() => onDeleteModel(model.model_id)}
                      className="h-10 w-10 items-center justify-center rounded-[10px] border border-white/80 bg-white/50"
                    >
                      <Ionicons name="trash-outline" size={16} color="#4A433A" />
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </GlassPanel>

      <GlassPanel contentClassName="px-4 py-4">
        <Text className="mb-3 text-[16px] font-semibold text-[#26221D]">{editingModelId ? "编辑模型" : "创建新模型"}</Text>

        <Input
          label="模型名称"
          value={modelName}
          onChangeText={setModelName}
          hint="建议命名：本人-春夏 / 家人-通勤"
        />

        <Text className="mt-3 text-[13px] text-[#665D52]">模板</Text>
        <View className="mt-2 flex-row flex-wrap gap-2">
          {bodyTemplates.map((template) => (
            <Pressable
              key={template.id}
              onPress={() => setSelectedTemplate(template.id)}
              className="rounded-full px-3 py-2"
              style={{
                backgroundColor: selectedTemplate === template.id ? "#26221D" : "rgba(255,255,255,0.56)",
              }}
            >
              <Text className={`text-[12px] ${selectedTemplate === template.id ? "text-white" : "text-[#3D362D]"}`}>
                {template.name}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-3 flex-row gap-2">
          <Pressable
            onPress={() => setUnit("cm")}
            className="h-10 flex-1 items-center justify-center rounded-[10px]"
            style={{ backgroundColor: unit === "cm" ? "#26221D" : "rgba(255,255,255,0.56)" }}
          >
            <Text className={`text-[13px] ${unit === "cm" ? "text-white" : "text-[#3D362D]"}`}>厘米 cm</Text>
          </Pressable>
          <Pressable
            onPress={() => setUnit("inch")}
            className="h-10 flex-1 items-center justify-center rounded-[10px]"
            style={{ backgroundColor: unit === "inch" ? "#26221D" : "rgba(255,255,255,0.56)" }}
          >
            <Text className={`text-[13px] ${unit === "inch" ? "text-white" : "text-[#3D362D]"}`}>英寸 inch</Text>
          </Pressable>
        </View>

        <View className="mt-3 gap-2">
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
        </View>

        <View className="mt-4 gap-2">
          <Button
            label={saving ? "保存中..." : editingModelId ? "更新模型" : "保存人体模型"}
            onPress={onSaveModel}
            disabled={saving}
            icon={<Ionicons name="save-outline" size={16} color="#FFFFFF" />}
          />
          {editingModelId ? (
            <Button
              label="新建空白模型"
              variant="ghost"
              onPress={() => {
                setEditingModelId(undefined);
                setModelName(`人体模型 ${Math.min(session.models.length + 1, 3)}`);
                setForm(defaultForm);
              }}
              className="border border-white/70 bg-white/45"
            />
          ) : null}
        </View>
      </GlassPanel>
    </MobileShell>
  );
}
