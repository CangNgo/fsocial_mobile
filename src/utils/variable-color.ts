export const COLORS = {
  // Brand Colors
  primary: "#FF4D00", // Vibrant Orange
  primaryHover: "#E64500",

  // Surface & Backgrounds
  surface: "#FCF8F9",
  surfaceContainer: "#F0EDEE",
  surfaceDim: "#DCD9DA",
  surfaceBright: "#FFFFFF",

  // Accent Colors
  accentEmerald: "#065F46",
  accentPurple: "#8B5CF6",
  error: "#EF4444",
  success: "#10B981",

  // Gradients
  gradient: {
    primary: {
      start: "#FF4D00",
      end: "#FF8A00",
      css: "linear-gradient(135deg, #FF4D00 0%, #FF8A00 100%)"
    },
    accent: {
      start: "#8B5CF6",
      end: "#D946EF",
      css: "linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)"
    },
    soft: {
      start: "#FBDDD0",
      end: "#FFF5F0",
      css: "linear-gradient(to bottom, #FFF5F0 0%, #FBDDD0 100%)"
    }
  },

  // Typography & UI Elements
  textPrimary: "#1A1A1A",
  textSecondary: "#757575",
  textOnPrimary: "#FFFFFF",
  border: "#E0E0E0",
} as const;

export type ColorKey = keyof typeof COLORS