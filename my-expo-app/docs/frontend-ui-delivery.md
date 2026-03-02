# AI试衣前端交付说明（Expo + NativeWind）

## 1. 布局说明

### 页面范围（核心5页）
- Dashboard：入口与状态总览。
- 三维输入：模板、围度输入、导入占位。
- 服装选择：筛选、卡片选择、启动生成。
- 生成中：阶段进度、取消任务。
- 结果解释：候选切换、热力图开关、尺码建议与风险提示。

### 统一布局规范
- 页面容器：`max-width: 1200`，左右 `padding: 24`。
- 页面区块间距：`gap: 16`。
- Card：内边距 `24`，圆角 `10`，边框 `1px`，双层阴影（默认/hover）。
- Button：高度 `40`。
- Input：高度 `40`。
- Icon：尺寸仅 `16 / 20`。

## 2. 设计 Token 表

### Color（light / dark）
| Token | Light | Dark |
|---|---|---|
| `background` | `#FFFFFF` | `#09090B` |
| `foreground` | `#18181B` | `#FAFAFA` |
| `card` | `#FFFFFF` | `#18181B` |
| `cardForeground` | `#18181B` | `#F4F4F5` |
| `muted` | `#F4F4F5` | `#27272A` |
| `mutedForeground` | `#71717A` | `#A1A1AA` |
| `border` | `#E4E4E7` | `#27272A` |
| `input` | `#E4E4E7` | `#3F3F46` |
| `primary` | `#DB2777` | `#EC4899` |
| `primaryForeground` | `#FFFFFF` | `#18181B` |
| `skyAssist` | `#0EA5E9` | `#38BDF8` |

### Spacing / Radius / Shadow / Typography
| 分类 | 取值 |
|---|---|
| `padding/margin/gap` | `4/8/12/16/24/32/40/48` |
| `radius` | `10` |
| `shadow default` | `0 1px 2px rgba(16,24,40,0.06)` |
| `shadow hover` | `0 4px 10px rgba(16,24,40,0.10)` |
| `font-size` | `12/14/16/20/24/32` |
| `line-height title` | `1.4` |
| `line-height body` | `1.6` |

## 3. 组件清单
- `AppShell`
- `SectionHeader`
- `Card` / `CardAction`
- `Button`
- `Input`
- `Chip`
- `MetricRow`
- `StepProgress`
- `TryOnPreviewPlaceholder`
- `HeatmapToggle`
- `RiskBanner`
- `IconWrap`
- `Badge`
- `Skeleton`

## 4. React + Tailwind（NativeWind）代码位置
- 路由与页面：
  - `app/index.tsx`
  - `app/tryon/profile.tsx`
  - `app/tryon/garment.tsx`
  - `app/tryon/generating.tsx`
  - `app/tryon/result.tsx`
- UI组件：
  - `src/components/ui/*`
- 业务类型与状态：
  - `src/features/tryon/types.ts`
  - `src/features/tryon/session-context.tsx`
  - `src/features/tryon/mock-data.ts`
- 接口预留与mock：
  - `src/services/tryon/api-routes.ts`
  - `src/services/tryon/mock-adapter.ts`

## 5. 后端接口预留说明
- 当前仅本地 mock，不发真实请求。
- 已预留接口路由常量与服务函数签名：
  - `saveProfile`
  - `listGarments`
  - `createTryOn`
  - `getTryOnStatus`
  - `getTryOnResult`
  - `getSizeRecommendation`
- 后端接入时，仅替换 `mock-adapter.ts` 为真实 API adapter，页面层无需改动。
