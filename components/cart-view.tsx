"use client"

import { useCart } from "@/lib/hooks/use-cart"
import { mockProducts } from "@/lib/db"
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { CheckoutModal } from "./checkout-modal"

export function CartView() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  const getProductName = (productId: string) => {
    return mockProducts.find((p) => p.id === productId)?.name || "Unknown Product"
  }

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <ShoppingCart className="w-16 h-16 text-muted-foreground opacity-50" />
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to get started!</p>
          <Link
            href="/"
            className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.productId} className="bg-card border border-border rounded-lg p-4 flex gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{getProductName(item.productId)}</h3>
                <p className="text-muted-foreground text-sm mt-1">${item.price.toFixed(2)} each</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-muted rounded-lg p-2">
                  <button
                    onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                    className="p-1 hover:bg-background rounded transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="p-1 hover:bg-background rounded transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right min-w-24">
                  <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>

          <div className="space-y-3 mb-6 pb-6 border-b border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>${(cart.total * 0.1).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-lg">Total</span>
            <span className="text-2xl font-bold text-primary">${(cart.total * 1.1).toFixed(2)}</span>
          </div>

          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Proceed to Checkout
          </button>

          <Link href="/" className="block text-center mt-4 text-primary hover:underline cursor-pointer">
            Continue Shopping
          </Link>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal cartItems={cart.items} total={cart.total * 1.1} onClose={() => setShowCheckout(false)} />
      )}
    </div>
  )
}
