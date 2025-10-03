"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"
import { db } from "./firebase"
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
  saveOrder: (orderData: any) => Promise<void>
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
    try {
      const usersRef = collection(db, "users")
      const q = query(usersRef, where("email", "==", email), where("password", "==", password))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data()
        const user = {
          id: querySnapshot.docs[0].id,
          name: userData.name,
          email: userData.email,
          createdAt: userData.createdAt,
        }
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const usersRef = collection(db, "users")
      const q = query(usersRef, where("email", "==", email))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        return false
      }

      const newUser = {
        name,
        email,
        password,
        createdAt: Date.now(),
      }

      const docRef = await addDoc(usersRef, newUser)
      const user = {
        id: docRef.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      return true
    } catch (error) {
      console.error("Register error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const saveOrder = async (orderData: any) => {
    try {
      const ordersRef = collection(db, "orders")
      await addDoc(ordersRef, {
        ...orderData,
        createdAt: Date.now(),
      })
    } catch (error) {
      console.error("Error saving order:", error)
    }
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
        saveOrder,
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
