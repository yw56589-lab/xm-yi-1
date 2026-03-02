export type ThemeMode = "light" | "dark";

export const colorTokens = {
  light: {
    background: "#FFFFFF",
    foreground: "#18181B",
    card: "#FFFFFF",
    cardForeground: "#18181B",
    muted: "#F4F4F5",
    mutedForeground: "#71717A",
    border: "#E4E4E7",
    input: "#E4E4E7",
    primary: "#DB2777",
    primaryForeground: "#FFFFFF",
    skyAssist: "#0EA5E9",
  },
  dark: {
    background: "#09090B",
    foreground: "#FAFAFA",
    card: "#18181B",
    cardForeground: "#F4F4F5",
    muted: "#27272A",
    mutedForeground: "#A1A1AA",
    border: "#27272A",
    input: "#3F3F46",
    primary: "#EC4899",
    primaryForeground: "#18181B",
    skyAssist: "#38BDF8",
  },
} as const;

export const spacingTokens = [4, 8, 12, 16, 24, 32, 40, 48] as const;

export const radiusTokens = {
  card: 10,
};

export const shadowTokens = {
  default: "0 1px 2px rgba(16,24,40,0.06)",
  hover: "0 4px 10px rgba(16,24,40,0.10)",
};

export const typographyTokens = {
  display: { fontSize: 32, lineHeight: 44.8, fontWeight: "700" },
  h1: { fontSize: 24, lineHeight: 33.6, fontWeight: "700" },
  h2: { fontSize: 20, lineHeight: 28, fontWeight: "600" },
  bodyMd: { fontSize: 16, lineHeight: 25.6, fontWeight: "400" },
  bodySm: { fontSize: 14, lineHeight: 22.4, fontWeight: "400" },
  caption: { fontSize: 12, lineHeight: 19.2, fontWeight: "400" },
} as const;
