"use client"

import { CheckCircle, Download, Home } from "lucide-react"
import Link from "next/link"
import { mockProducts } from "@/lib/db"

interface ReceiptModalProps {
  receipt: {
    name: string
    email: string
    items: Array<{ productId: string; quantity: number; price: number }>
    total: number
    timestamp: string
  }
  onClose: () => void
}

export function ReceiptModal({ receipt, onClose }: ReceiptModalProps) {
  const handlePrint = () => {
    window.print()
  }

  const getProductName = (productId: string) => {
    return mockProducts.find((p) => p.id === productId)?.name || "Unknown Product"
  }

  const formattedDate = new Date(receipt.timestamp).toLocaleString()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 text-center border-b border-border">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
          <p className="text-muted-foreground">Thank you for your purchase</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Details */}
          <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
            <div>
              <p className="text-muted-foreground">Order ID</p>
              <p className="font-mono font-semibold">{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Date & Time</p>
              <p className="font-semibold">{formattedDate}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-semibold">{receipt.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-semibold">{receipt.email}</p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-2">
            <h3 className="font-semibold">Order Items</h3>
            <div className="space-y-2 text-sm">
              {receipt.items.map((item) => (
                <div key={item.productId} className="flex justify-between">
                  <span>
                    {getProductName(item.productId)} x{item.quantity}
                  </span>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-primary/10 border border-primary rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Amount</span>
              <span className="text-2xl font-bold text-primary">${receipt.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handlePrint}
              className="w-full bg-muted text-foreground py-2 rounded-lg font-semibold hover:bg-muted/80 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Print Receipt
            </button>

            <Link
              href="/"
              onClick={onClose}
              className="block text-center bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              <span className="flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
