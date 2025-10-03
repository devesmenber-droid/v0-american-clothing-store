"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { AuthDialog } from "./auth-dialog"

export function Header() {
  const { cart, user } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <header className="border-b border-border bg-background sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              AMERICAN STYLE
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                SHOP
              </Link>
              <Link href="/#new" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                NEW ARRIVALS
              </Link>
              <Link href="/#about" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                ABOUT
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setAuthDialogOpen(true)} className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                <Link href="/" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  SHOP
                </Link>
                <Link href="/#new" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  NEW ARRIVALS
                </Link>
                <Link href="/#about" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  ABOUT
                </Link>
                <Button
                  variant="outline"
                  className="justify-start bg-transparent"
                  onClick={() => {
                    setAuthDialogOpen(true)
                    setMobileMenuOpen(false)
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  {user ? user.name : "Login / Register"}
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  )
}
