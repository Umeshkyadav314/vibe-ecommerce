"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ProductsGrid } from "@/components/products-grid"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/hooks/use-cart"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const { cart, addToCart } = useCart()

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header cartCount={cartCount} onSearchChange={setSearchQuery} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome to Vibe Commerce</h1>
          <p className="text-muted-foreground text-lg">
            Discover our collection of premium electronics and accessories
          </p>
        </div>

        <ProductsGrid searchQuery={searchQuery} onAddToCart={addToCart} />
      </main>

      <Footer />
    </div>
  )
}
