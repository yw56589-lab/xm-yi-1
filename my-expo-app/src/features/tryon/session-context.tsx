import React, { createContext, useContext, useMemo, useState } from "react";

import type { Candidate, Profile3DInput, SizeRecommendation, TryOnJob, TryOnSession } from "./types";

type TryOnSessionContextValue = {
  session: TryOnSession;
  setProfile: (profile: Profile3DInput, profileId: string, template?: string, modelName?: string) => void;
  setActiveModel: (modelId: string) => void;
  setGarment: (garmentId: string, fit: TryOnSession["preferred_fit"]) => void;
  setJob: (jobId: string) => void;
  setJobState: (job: TryOnJob) => void;
  setResult: (topResultId: string, candidates: Candidate[]) => void;
  setSizeRecommendation: (recommendation: SizeRecommendation) => void;
  toggleHeatmap: () => void;
  resetFlow: () => void;
};

const initialSession: TryOnSession = {
  user_id: "demo-user-001",
  models: [],
  preferred_fit: "regular",
  heatmap_enabled: false,
};

const TryOnSessionContext = createContext<TryOnSessionContextValue | null>(null);

export function TryOnSessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<TryOnSession>(initialSession);

  const value = useMemo<TryOnSessionContextValue>(
    () => ({
      session,
      setProfile: (profile, profileId, template, modelName) =>
        setSession((prev) => {
          const existing = prev.models.find((item) => item.model_id === profileId);
          const nextModel = {
            model_id: profileId,
            model_name: modelName ?? `人体模型 ${prev.models.length + 1}`,
            profile,
            updated_at: new Date().toISOString(),
          };
          const mergedModels = existing
            ? prev.models.map((item) => (item.model_id === profileId ? nextModel : item))
            : [...prev.models.slice(0, 2), nextModel];

          return {
            ...prev,
            models: mergedModels,
            active_model_id: profileId,
            profile,
            profile_id: profileId,
            selected_template: template,
          };
        }),
      setActiveModel: (modelId) =>
        setSession((prev) => {
          const current = prev.models.find((item) => item.model_id === modelId);
          return {
            ...prev,
            active_model_id: modelId,
            profile_id: modelId,
            profile: current?.profile,
          };
        }),
      setGarment: (garmentId, fit) =>
        setSession((prev) => ({
          ...prev,
          garment_id: garmentId,
          preferred_fit: fit,
        })),
      setJob: (jobId) =>
        setSession((prev) => ({
          ...prev,
          job_id: jobId,
          job: undefined,
          candidates: undefined,
          top_result_id: undefined,
          size_recommendation: undefined,
        })),
      setJobState: (job) =>
        setSession((prev) => ({
          ...prev,
          job,
        })),
      setResult: (topResultId, candidates) =>
        setSession((prev) => ({
          ...prev,
          top_result_id: topResultId,
          candidates,
          last_generated_at: new Date().toISOString(),
        })),
      setSizeRecommendation: (recommendation) =>
        setSession((prev) => ({
          ...prev,
          size_recommendation: recommendation,
        })),
      toggleHeatmap: () =>
        setSession((prev) => ({
          ...prev,
          heatmap_enabled: !prev.heatmap_enabled,
        })),
      resetFlow: () =>
        setSession((prev) => ({
          ...initialSession,
          user_id: prev.user_id,
          models: prev.models,
          active_model_id: prev.active_model_id,
          profile: prev.profile,
          profile_id: prev.profile_id,
        })),
    }),
    [session],
  );

  return <TryOnSessionContext.Provider value={value}>{children}</TryOnSessionContext.Provider>;
}

export function useTryOnSession() {
  const context = useContext(TryOnSessionContext);
  if (!context) {
    throw new Error("useTryOnSession must be used within TryOnSessionProvider");
  }
  return context;
}
