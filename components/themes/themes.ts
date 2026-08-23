export const themeIds = [
  "royal_classic",
  "modern_minimalist",
  "floral_enchantment",
] as const

export type ThemeId = (typeof themeIds)[number]

export function resolveThemeId(value: string): ThemeId {
  return (themeIds as readonly string[]).includes(value)
    ? (value as ThemeId)
    : "royal_classic"
}

export const themes: Record<
  ThemeId,
  {
    label: string
    description: string
    /** Preview swatches for the theme picker. */
    swatch: { background: string; primary: string; accent: string }
  }
> = {
  royal_classic: {
    label: "Royal Classic",
    description: "Ivory hangat, Rose Copper, serif elegan — pernikahan tradisional",
    swatch: {
      background: "oklch(0.98 0.005 85)",
      primary: "oklch(0.56 0.1 15)",
      accent: "oklch(0.78 0.14 75)",
    },
  },
  modern_minimalist: {
    label: "Modern Minimalist",
    description: "Latar gelap, kontras tinggi, minimal — acara kekinian",
    swatch: {
      background: "oklch(0.16 0.008 260)",
      primary: "oklch(0.85 0.01 260)",
      accent: "oklch(0.56 0.1 15)",
    },
  },
  floral_enchantment: {
    label: "Floral Enchantment",
    description: "Gradien blush & champagne, romantis, botanikal",
    swatch: {
      background: "oklch(0.97 0.015 30)",
      primary: "oklch(0.5 0.12 10)",
      accent: "oklch(0.9 0.03 90)",
    },
  },
}
