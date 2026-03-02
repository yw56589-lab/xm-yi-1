import { candidateResults, garments, progressingJobs } from "@/src/features/tryon/mock-data";
import type {
  FitPreference,
  Garment,
  Profile3DInput,
  SizeRecommendation,
  TryOnJob,
} from "@/src/features/tryon/types";

type TryOnPayload = {
  profile_id: string;
  garment_id: string;
  preferred_fit: FitPreference;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let pollIndex = 0;
const jobStore = new Map<string, TryOnPayload>();

export async function saveProfile(input: Profile3DInput, profileId?: string): Promise<{ profile_id: string }> {
  await wait(260);
  void input;
  return { profile_id: profileId ?? `profile-${Date.now()}` };
}

export async function listGarments(filter?: {
  category?: Garment["category"];
  style?: Garment["style"];
}): Promise<Garment[]> {
  await wait(220);
  if (!filter?.category && !filter?.style) return garments;
  return garments.filter((item) => {
    const categoryOk = !filter.category || item.category === filter.category;
    const styleOk = !filter.style || item.style === filter.style;
    return categoryOk && styleOk;
  });
}

export async function createTryOn(payload: TryOnPayload): Promise<{ job_id: string }> {
  await wait(260);
  const jobId = `job-${Date.now()}`;
  pollIndex = 0;
  jobStore.set(jobId, payload);
  return { job_id: jobId };
}

export async function getTryOnStatus(jobId: string): Promise<TryOnJob> {
  await wait(480);
  const job = progressingJobs[Math.min(pollIndex, progressingJobs.length - 1)];
  pollIndex += 1;
  return { ...job, job_id: jobId };
}

export async function getTryOnResult(jobId: string): Promise<{
  top_result_id: string;
  candidates: typeof candidateResults;
}> {
  await wait(260);
  if (!jobStore.has(jobId)) {
    throw new Error("任务不存在，请重新生成");
  }
  return {
    top_result_id: candidateResults[0].result_id,
    candidates: candidateResults,
  };
}

export async function getSizeRecommendation(jobId: string): Promise<SizeRecommendation> {
  await wait(240);
  if (!jobStore.has(jobId)) {
    throw new Error("尺码推荐不可用");
  }
  return {
    recommended_size: "M",
    confidence: "medium",
    fit_margins: {
      bust_margin_cm: 3.0,
      waist_margin_cm: 2.1,
      hip_margin_cm: 2.6,
      shoulder_margin_cm: 1.2,
    },
    explanation: "建议 M 码，胸围余量约 3.0cm，整体偏合身。",
  };
}
