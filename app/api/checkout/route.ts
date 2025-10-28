import { clearCart, createCheckoutReceipt } from "@/lib/db"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, items, total } = body

    if (!name || !email || !items || !total) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const receipt = createCheckoutReceipt({
      name,
      email,
      items,
      total,
      timestamp: new Date().toISOString(),
    })

    // Clear cart after successful checkout
    clearCart("default")

    return NextResponse.json({
      success: true,
      data: receipt,
      message: "Checkout successful",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Checkout failed" }, { status: 500 })
  }
}
