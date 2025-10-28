"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { useCart } from "@/lib/hooks/use-cart"
import { ReceiptModal } from "./receipt-modal"

interface CartItem {
  productId: string
  quantity: number
  price: number
}

interface CheckoutModalProps {
  cartItems: CartItem[]
  total: number
  onClose: () => void
}

export function CheckoutModal({ cartItems, total, onClose }: CheckoutModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [receipt, setReceipt] = useState<any>(null)
  const { clearCart } = useCart()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please fill in all fields")
      return
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email")
      return
    }

    try {
      setLoading(true)
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          items: cartItems,
          total,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setReceipt(data.data)
        await clearCart()
      } else {
        setError(data.error || "Checkout failed")
      }
    } catch (err) {
      setError("Failed to process checkout")
    } finally {
      setLoading(false)
    }
  }

  if (receipt) {
    return <ReceiptModal receipt={receipt} onClose={onClose} />
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold">Checkout</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-text"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-text"
              placeholder="john@example.com"
            />
          </div>

          <div className="bg-muted rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${(total / 1.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (10%)</span>
              <span>${(total - total / 1.1).toFixed(2)}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Processing..." : "Complete Purchase"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-muted text-foreground py-2 rounded-lg font-semibold hover:bg-muted/80 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}
