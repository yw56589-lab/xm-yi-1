export const API_ROUTES = {
  saveProfile: "/api/v1/profile3d/save",
  listGarments: "/api/v1/garments",
  createTryOn: "/api/v1/tryon/jobs",
  getTryOnStatus: (jobId: string) => `/api/v1/tryon/jobs/${jobId}`,
  getTryOnResult: (jobId: string) => `/api/v1/tryon/jobs/${jobId}/result`,
  getSizeRecommendation: (jobId: string) => `/api/v1/size/recommend/${jobId}`,
} as const;
