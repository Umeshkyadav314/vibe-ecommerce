"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Minus } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  description: string
  image: string
  onAddToCart: (productId: string, quantity: number) => void
}

export function ProductCard({ id, name, price, description, image, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    onAddToCart(id, quantity)
    setQuantity(1)
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-muted overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="font-semibold text-lg text-card-foreground line-clamp-2">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2 bg-muted rounded-lg p-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-1 hover:bg-background rounded transition-colors cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="flex-1 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-1 hover:bg-background rounded transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
