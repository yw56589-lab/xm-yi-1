import type { Candidate, Garment, TryOnJob } from "./types";

export const bodyTemplates = [
  { id: "balanced", name: "均衡型", tip: "标准体型，适合大多数上装版型。" },
  { id: "pear", name: "梨形", tip: "建议重点关注腰臀余量。" },
  { id: "apple", name: "苹果型", tip: "建议重点关注胸围余量。" },
];

export const homePushFeed = [
  {
    id: "push-1",
    title: "春季轻薄通勤",
    subtitle: "根据你最近收藏推荐 6 件上衣",
    badge: "今日推荐",
  },
  {
    id: "push-2",
    title: "版型更新提醒",
    subtitle: "你常试穿的衬衫系列新增 2 个修身版",
    badge: "上新",
  },
  {
    id: "push-3",
    title: "尺码精度提升",
    subtitle: "已按你的模型修正肩宽和胸围建议",
    badge: "系统通知",
  },
];

export const garments: Garment[] = [
  {
    garment_id: "shirt-1",
    title: "衬衫 1",
    category: "tops",
    group: "衬衫",
    fit_type: "regular",
    style: "office",
    cover: "mist-blue",
    fit_score: 91,
    price: 399,
    gallery: ["正面", "45° 侧面", "背面"],
    description: "轻挺府绸面料，适合通勤与半正式场景，肩线利落。",
    intro_pairs: [
      { label: "面料", value: "96% 棉 4% 氨纶" },
      { label: "版型", value: "常规直筒" },
      { label: "领型", value: "标准尖领" },
      { label: "洗护", value: "30°C 轻柔机洗" },
    ],
  },
  {
    garment_id: "shirt-2",
    title: "衬衫 2",
    category: "tops",
    group: "衬衫",
    fit_type: "slim",
    style: "office",
    cover: "stone-gray",
    fit_score: 88,
    price: 429,
    gallery: ["正面", "45° 侧面", "背面"],
    description: "修身剪裁，胸腰过渡更贴体，适合叠穿西装。",
    intro_pairs: [
      { label: "面料", value: "高支棉混纺" },
      { label: "版型", value: "修身" },
      { label: "领型", value: "小方领" },
      { label: "洗护", value: "建议反面机洗" },
    ],
  },
  {
    garment_id: "top-1",
    title: "上衣 1",
    category: "tops",
    group: "上衣",
    fit_type: "regular",
    style: "daily",
    cover: "sage",
    fit_score: 93,
    price: 299,
    gallery: ["正面", "45° 侧面", "背面"],
    description: "柔软针织上衣，弹性适中，日常穿着舒适。",
    intro_pairs: [
      { label: "面料", value: "莫代尔混纺" },
      { label: "版型", value: "微宽松" },
      { label: "领口", value: "圆领" },
      { label: "洗护", value: "冷水手洗" },
    ],
  },
  {
    garment_id: "top-2",
    title: "上衣 2",
    category: "tops",
    group: "上衣",
    fit_type: "loose",
    style: "daily",
    cover: "warm-ivory",
    fit_score: 90,
    price: 329,
    gallery: ["正面", "45° 侧面", "背面"],
    description: "落肩廓形，袖笼空间更大，强调休闲松弛感。",
    intro_pairs: [
      { label: "面料", value: "棉感针织" },
      { label: "版型", value: "宽松" },
      { label: "袖型", value: "落肩长袖" },
      { label: "洗护", value: "不可高温烘干" },
    ],
  },
  {
    garment_id: "top-3",
    title: "上衣 3",
    category: "tops",
    group: "上衣",
    fit_type: "slim",
    style: "sport",
    cover: "ink",
    fit_score: 87,
    price: 359,
    gallery: ["正面", "45° 侧面", "背面"],
    description: "运动针织结构，透气区块更明显，活动量大时也舒适。",
    intro_pairs: [
      { label: "面料", value: "速干纤维" },
      { label: "版型", value: "修身运动" },
      { label: "功能", value: "吸湿排汗" },
      { label: "洗护", value: "常温机洗" },
    ],
  },
  {
    garment_id: "top-4",
    title: "上衣 4",
    category: "tops",
    group: "上衣",
    fit_type: "regular",
    style: "sport",
    cover: "sunset",
    fit_score: 89,
    price: 369,
    gallery: ["正面", "45° 侧面", "背面"],
    description: "短款运动上衣，前片利落，适配高腰下装。",
    intro_pairs: [
      { label: "面料", value: "高弹尼龙" },
      { label: "版型", value: "常规短款" },
      { label: "功能", value: "四向弹力" },
      { label: "洗护", value: "阴干" },
    ],
  },
];

export const candidateResults: Candidate[] = [
  {
    result_id: "r-001",
    label: "候选 1",
    score: 0.92,
    preview: "mock://result/001",
  },
  {
    result_id: "r-002",
    label: "候选 2",
    score: 0.88,
    preview: "mock://result/002",
  },
];

export const progressingJobs: TryOnJob[] = [
  { job_id: "job-seed", status: "running", stage: "aligning", progress: 22, retries: 0 },
  { job_id: "job-seed", status: "running", stage: "refining", progress: 58, retries: 0 },
  { job_id: "job-seed", status: "running", stage: "scoring", progress: 86, retries: 0 },
  { job_id: "job-seed", status: "succeeded", stage: "scoring", progress: 100, retries: 0 },
];
