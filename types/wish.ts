import type { WishInput } from "@/lib/validations/wish"

export interface Wish extends WishInput {
  id: string
  invitation_id: string
  created_at: string
}
