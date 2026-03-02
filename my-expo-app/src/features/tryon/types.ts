export type ProfileSource = "template" | "manual" | "import";
export type FitPreference = "regular" | "loose" | "slim";
export type ProductGroup = "衬衫" | "上衣";

export type Profile3DInput = {
  source: ProfileSource;
  gender: "female" | "male" | "unisex";
  height_cm: number;
  shoulder_cm: number;
  bust_cm: number;
  waist_cm: number;
  hip_cm: number;
  arm_len_cm?: number;
};

export type Garment = {
  garment_id: string;
  title: string;
  category: "tops" | "dress";
  group?: ProductGroup;
  fit_type: "slim" | "regular" | "loose";
  style: "daily" | "office" | "sport";
  cover: string;
  fit_score: number;
  price: number;
  gallery: string[];
  description: string;
  intro_pairs: {
    label: string;
    value: string;
  }[];
};

export type TryOnStage = "aligning" | "refining" | "scoring";
export type TryOnStatus = "queued" | "running" | "succeeded" | "failed";

export type TryOnJob = {
  job_id: string;
  status: TryOnStatus;
  stage: TryOnStage;
  progress: number;
  retries: number;
};

export type Candidate = {
  result_id: string;
  label: string;
  score: number;
  preview: string;
};

export type SizeRecommendation = {
  recommended_size: string;
  confidence: "high" | "medium" | "low";
  fit_margins: {
    bust_margin_cm: number;
    waist_margin_cm: number;
    hip_margin_cm: number;
    shoulder_margin_cm: number;
  };
  explanation: string;
};

export type TryOnSession = {
  user_id: string;
  models: {
    model_id: string;
    model_name: string;
    profile: Profile3DInput;
    updated_at: string;
  }[];
  active_model_id?: string;
  profile_id?: string;
  profile?: Profile3DInput;
  selected_template?: string;
  garment_id?: string;
  preferred_fit: FitPreference;
  job_id?: string;
  job?: TryOnJob;
  candidates?: Candidate[];
  top_result_id?: string;
  size_recommendation?: SizeRecommendation;
  heatmap_enabled: boolean;
  last_generated_at?: string;
  favorites: string[];
};
