export const themeIds = ["classic", "modern", "minimal"] as const

export type ThemeId = (typeof themeIds)[number]

export function resolveThemeId(value: string): ThemeId {
  return (themeIds as readonly string[]).includes(value)
    ? (value as ThemeId)
    : "classic"
}

export const themes: Record<
  ThemeId,
  {
    label: string
    description: string
    /** Preview swatches for the theme picker dropdown. */
    swatch: { background: string; primary: string; accent: string }
  }
> = {
  classic: {
    label: "Classic",
    description: "Elegan, hangat, serif — cocok untuk pernikahan tradisional",
    swatch: {
      background: "oklch(0.98 0.01 85)",
      primary: "oklch(0.35 0.08 30)",
      accent: "oklch(0.85 0.05 75)",
    },
  },
  modern: {
    label: "Modern",
    description: "Bold, sans-serif, warna cerah — cocok untuk acara kekinian",
    swatch: {
      background: "oklch(1 0 0)",
      primary: "oklch(0.45 0.15 250)",
      accent: "oklch(0.7 0.15 190)",
    },
  },
  minimal: {
    label: "Minimal",
    description: "Bersih, monokrom, banyak whitespace — cocok untuk gaya simpel",
    swatch: {
      background: "oklch(1 0 0)",
      primary: "oklch(0.2 0 0)",
      accent: "oklch(0.9 0 0)",
    },
  },
}
