import { removeFromCart, updateCartItemQuantity } from "@/lib/db"
import { NextResponse, type NextRequest } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const cart = removeFromCart("default", id)
    return NextResponse.json({
      success: true,
      data: cart,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to remove item from cart" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { quantity } = body

    if (quantity === undefined || quantity < 0) {
      return NextResponse.json({ success: false, error: "Invalid quantity" }, { status: 400 })
    }

    const cart = updateCartItemQuantity("default", id, quantity)
    return NextResponse.json({
      success: true,
      data: cart,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update cart item" }, { status: 500 })
  }
}
