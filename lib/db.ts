// Mock database with in-memory storage
interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: string
}

interface CartItem {
  productId: string
  quantity: number
  price: number
}

interface Cart {
  items: CartItem[]
  total: number
}

interface CheckoutData {
  name: string
  email: string
  items: CartItem[]
  total: number
  timestamp: string
}

// Mock products data
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 79.99,
    description: "Premium noise-cancelling wireless headphones",
    image: "/wireless-headphones.png",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    description: "Advanced fitness tracking smartwatch",
    image: "/smartwatch-lifestyle.png",
    category: "Electronics",
  },
  {
    id: "3",
    name: "USB-C Cable",
    price: 12.99,
    description: "Durable 2-meter USB-C charging cable",
    image: "/usb-cable.png",
    category: "Accessories",
  },
  {
    id: "4",
    name: "Portable Charger",
    price: 34.99,
    description: "20000mAh portable power bank",
    image: "/portable-charger-lifestyle.png",
    category: "Accessories",
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    price: 129.99,
    description: "RGB mechanical gaming keyboard",
    image: "/mechanical-keyboard.png",
    category: "Electronics",
  },
  {
    id: "6",
    name: "Wireless Mouse",
    price: 49.99,
    description: "Ergonomic wireless mouse with precision tracking",
    image: "/wireless-mouse.png",
    category: "Accessories",
  },
  {
    id: "7",
    name: "4K Webcam",
    price: 89.99,
    description: "Ultra HD webcam for streaming and video calls",
    image: "/classic-webcam.png",
    category: "Electronics",
  },
  {
    id: "8",
    name: "Phone Stand",
    price: 19.99,
    description: "Adjustable phone stand for desk",
    image: "/phone-stand.jpg",
    category: "Accessories",
  },
]

// In-memory cart storage (in production, this would be in a database)
const cartStorage: Map<string, Cart> = new Map()

export function getCart(userId = "default"): Cart {
  if (!cartStorage.has(userId)) {
    cartStorage.set(userId, { items: [], total: 0 })
  }
  return cartStorage.get(userId)!
}

export function addToCart(userId: string, productId: string, quantity: number): Cart {
  const product = mockProducts.find((p) => p.id === productId)
  if (!product) throw new Error("Product not found")

  const cart = getCart(userId)
  const existingItem = cart.items.find((item) => item.productId === productId)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.items.push({
      productId,
      quantity,
      price: product.price,
    })
  }

  updateCartTotal(cart)
  cartStorage.set(userId, cart)
  return cart
}

export function removeFromCart(userId: string, productId: string): Cart {
  const cart = getCart(userId)
  cart.items = cart.items.filter((item) => item.productId !== productId)
  updateCartTotal(cart)
  cartStorage.set(userId, cart)
  return cart
}

export function updateCartItemQuantity(userId: string, productId: string, quantity: number): Cart {
  const cart = getCart(userId)
  const item = cart.items.find((i) => i.productId === productId)
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(userId, productId)
    }
    item.quantity = quantity
  }
  updateCartTotal(cart)
  cartStorage.set(userId, cart)
  return cart
}

export function clearCart(userId = "default"): Cart {
  const emptyCart: Cart = { items: [], total: 0 }
  cartStorage.set(userId, emptyCart)
  return emptyCart
}

function updateCartTotal(cart: Cart): void {
  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function createCheckoutReceipt(data: CheckoutData): CheckoutData {
  return {
    ...data,
    timestamp: new Date().toISOString(),
  }
}
