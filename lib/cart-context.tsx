"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem, Product, User } from "./store"

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, size: string) => void
  removeFromCart: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  total: number
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    const savedUser = localStorage.getItem("user")
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { ...product, quantity: 1, size }]
    })
  }

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.size === size)))
  }

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
      return
    }
    setCart((prev) => prev.map((item) => (item.id === productId && item.size === size ? { ...item, quantity } : item)))
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const login = async (email: string, password: string): Promise<boolean> => {
    const savedUsers = localStorage.getItem("users")
    const users = savedUsers ? JSON.parse(savedUsers) : []
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const user = { id: foundUser.id, name: foundUser.name, email: foundUser.email }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      return true
    }
    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const savedUsers = localStorage.getItem("users")
    const users = savedUsers ? JSON.parse(savedUsers) : []

    if (users.find((u: any) => u.email === email)) {
      return false
    }

    const newUser = { id: Date.now().toString(), name, email, password }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    const user = { id: newUser.id, name: newUser.name, email: newUser.email }
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
