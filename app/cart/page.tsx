"use client"

import { Header } from "@/components/header"
import { CartView } from "@/components/cart-view"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/hooks/use-cart"

export default function CartPage() {
  const { cart } = useCart()
  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header cartCount={cartCount} onSearchChange={() => {}} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <CartView />
      </main>

      <Footer />
    </div>
  )
}
