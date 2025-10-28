import { getCart, addToCart, clearCart } from "@/lib/db"
import { NextResponse, type NextRequest } from "next/server"

export async function GET() {
  try {
    const cart = getCart("default")
    return NextResponse.json({
      success: true,
      data: cart,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, quantity } = body

    if (!productId || !quantity || quantity < 1) {
      return NextResponse.json({ success: false, error: "Invalid product ID or quantity" }, { status: 400 })
    }

    const cart = addToCart("default", productId, quantity)
    return NextResponse.json({
      success: true,
      data: cart,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add item to cart" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const cart = clearCart("default")
    return NextResponse.json({
      success: true,
      data: cart,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to clear cart" }, { status: 500 })
  }
}
