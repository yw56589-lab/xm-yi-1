# AI试衣前端交付说明（Expo + NativeWind）

## 1. 当前业务范围
- 仅覆盖 AI 试衣主流程，不包含卖货、购物车、结算。
- 三维人体模型独立管理，建模后可在多商品间复用，不要求每次试衣都重新建模。
- 当前商品池为 6 个 mock 商品：衬衫 1/2、上衣 1/2/3/4。

## 2. 当前流程（已落地）
1. 首页：模型管理 + 搜索 + 分类 + 商品列表。
2. 商品详情页：正常商品详情结构，底部提供 `AI试衣入口`。
3. 点击 `AI试衣入口` 后直接进入试穿结果页。
4. 若无当前人体模型，先弹窗引导进入模型管理页创建并设为当前模型。

## 3. 统一布局规范（Token 约束）
- 页面容器：`max-width: 1200`，左右 `padding: 24`。
- 页面区块间距：`gap: 16`。
- Card：内边距 `24`，圆角 `10`，边框 `1px`，双层阴影（默认/hover）。
- Button：高度 `40`。
- Input：高度 `40`。
- Icon：尺寸仅 `16 / 20`。
- spacing 仅允许：`4/8/12/16/24/32/40/48`。

## 4. 设计 Token（Light / Dark）
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

## 5. 页面与路由（现行）
- `app/index.tsx`：首页（模型管理、搜索、分类、商品流）。
- `app/product/[id].tsx`：商品详情页（底部 AI 试衣入口）。
- `app/tryon/profile.tsx`：人体模型管理/创建页。
- `app/tryon/result.tsx`：试穿结果页。
- `app/_layout.tsx`：Stack 路由注册。

## 6. 组件与状态
- UI 组件目录：`src/components/ui/*`。
- 核心类型：`src/features/tryon/types.ts`。
- 会话状态：`src/features/tryon/session-context.tsx`。
- mock 数据：`src/features/tryon/mock-data.ts`。
  - `session.models[]` 与 `active_model_id` 为当前模型复用机制的核心字段。

## 7. 服务层与接口预留
- 当前通过本地 mock 适配器提供能力：`src/services/tryon/mock-adapter.ts`。
- 后端路由常量预留：`src/services/tryon/api-routes.ts`。
- 对外统一导出：`src/services/tryon/index.ts`。
- 后续接入真实后端时，仅替换 adapter，实现页面层零改动。

## 8. 对齐说明
- 已废弃旧流程页面：`app/tryon/garment.tsx`、`app/tryon/generating.tsx`。
- 当前仓库以“商品流 + 详情页底部 AI 入口”的流程为唯一标准，不回退到旧入口结构。
