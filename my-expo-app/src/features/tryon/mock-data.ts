import type { Candidate, Garment, TryOnJob } from "./types";

export const bodyTemplates = [
  { id: "balanced", name: "匀称型", tip: "标准体型，适合多数上装版型。" },
  { id: "pear", name: "梨形", tip: "建议重点关注腰臀余量。" },
  { id: "apple", name: "苹果型", tip: "建议重点关注胸围余量。" },
];

export const garments: Garment[] = [
  {
    garment_id: "shirt-1",
    title: "衬衫1",
    category: "tops",
    group: "衬衫",
    fit_type: "regular",
    style: "office",
    cover: "mock://garment/shirt-1",
    fit_score: 91,
  },
  {
    garment_id: "shirt-2",
    title: "衬衫2",
    category: "tops",
    group: "衬衫",
    fit_type: "slim",
    style: "office",
    cover: "mock://garment/shirt-2",
    fit_score: 88,
  },
  {
    garment_id: "top-1",
    title: "上衣1",
    category: "tops",
    group: "上衣",
    fit_type: "regular",
    style: "daily",
    cover: "mock://garment/top-1",
    fit_score: 93,
  },
  {
    garment_id: "top-2",
    title: "上衣2",
    category: "tops",
    group: "上衣",
    fit_type: "loose",
    style: "daily",
    cover: "mock://garment/top-2",
    fit_score: 90,
  },
  {
    garment_id: "top-3",
    title: "上衣3",
    category: "tops",
    group: "上衣",
    fit_type: "slim",
    style: "sport",
    cover: "mock://garment/top-3",
    fit_score: 87,
  },
  {
    garment_id: "top-4",
    title: "上衣4",
    category: "tops",
    group: "上衣",
    fit_type: "regular",
    style: "sport",
    cover: "mock://garment/top-4",
    fit_score: 89,
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
