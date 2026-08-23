import { describe, expect, it } from "vitest"
import { slugify } from "./slug"

describe("slugify", () => {
  it("converts spaces and uppercase into a lowercase dashed slug", () => {
    expect(slugify("Budi & Ani")).toBe("budi-ani")
  })

  it("collapses repeated dashes and trims edges", () => {
    expect(slugify("  Ulang Tahun -- ke 25  ")).toBe("ulang-tahun-ke-25")
  })

  it("strips characters outside a-z0-9 and space", () => {
    expect(slugify("Budi's Wedding!")).toBe("budis-wedding")
  })
})
