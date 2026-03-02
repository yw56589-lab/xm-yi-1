import { Text } from "react-native";

import { GlassPanel, MobileHeader, MobileShell } from "@/src/components/ui";

export default function MeTabPage() {
  return (
    <MobileShell>
      <MobileHeader title="我" subtitle="页面暂时留白，后续可扩展账号与设置模块" />
      <GlassPanel contentClassName="items-center py-12">
        <Text className="text-[18px] font-semibold text-[#2A2621]">Coming Soon</Text>
      </GlassPanel>
    </MobileShell>
  );
}
