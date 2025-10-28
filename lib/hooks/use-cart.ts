"use client"

import { useState, useEffect, useCallback } from "react"

interface CartItem {
  productId: string
  quantity: number
  price: number
}

interface Cart {
  items: CartItem[]
  total: number
}

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/cart")
      const data = await response.json()
      if (data.success) {
        setCart(data.data)
      }
    } catch (err) {
      setError("Failed to fetch cart")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const addToCart = useCallback(async (productId: string, quantity: number) => {
    try {
      setError(null)
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      })
      const data = await response.json()
      if (data.success) {
        setCart(data.data)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to add item to cart")
    }
  }, [])

  const removeFromCart = useCallback(async (productId: string) => {
    try {
      setError(null)
      const response = await fetch(`/api/cart/${productId}`, {
        method: "DELETE",
      })
      const data = await response.json()
      if (data.success) {
        setCart(data.data)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to remove item from cart")
    }
  }, [])

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    try {
      setError(null)
      const response = await fetch(`/api/cart/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      })
      const data = await response.json()
      if (data.success) {
        setCart(data.data)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to update quantity")
    }
  }, [])

  const clearCart = useCallback(async () => {
    try {
      setError(null)
      const response = await fetch("/api/cart", {
        method: "DELETE",
      })
      const data = await response.json()
      if (data.success) {
        setCart(data.data)
      }
    } catch (err) {
      setError("Failed to clear cart")
    }
  }, [])

  return {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refetch: fetchCart,
  }
}
