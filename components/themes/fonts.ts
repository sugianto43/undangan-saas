import { Inter, Playfair_Display, Poppins } from "next/font/google"
import type { ThemeId } from "@/components/themes/themes"

// Each theme font maps to the same --font-theme variable name, so only the
// active theme's .variable class needs to be applied to the page wrapper —
// no per-theme conditional CSS beyond that one class swap.
const classicFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-theme",
})

const modernFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-theme",
})

const minimalFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-theme",
})

export const themeFonts: Record<ThemeId, { variable: string }> = {
  classic: classicFont,
  modern: modernFont,
  minimal: minimalFont,
}
