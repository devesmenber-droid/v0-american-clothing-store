"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/store"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size", variant: "destructive" })
      return
    }
    addToCart(product, selectedSize)
    toast({ title: "Added to cart!" })
    setDialogOpen(false)
    setSelectedSize("")
  }

  return (
    <>
      <Card className="group overflow-hidden border-border hover:border-foreground transition-colors cursor-pointer">
        <div className="aspect-square overflow-hidden bg-secondary" onClick={() => setDialogOpen(true)}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-sm">{product.name}</h3>
              <p className="text-xs text-muted-foreground">{product.category}</p>
            </div>
            <p className="font-bold">${product.price}</p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="w-full" variant="outline">
            SELECT SIZE
          </Button>
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-square bg-secondary">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold">${product.price}</p>
                <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
              </div>
              <div className="space-y-2">
                <Label>Select Size</Label>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                  <div className="grid grid-cols-3 gap-2">
                    {product.sizes.map((size) => (
                      <div key={size}>
                        <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                        <Label
                          htmlFor={`size-${size}`}
                          className="flex items-center justify-center border border-border p-2 cursor-pointer peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background hover:border-foreground transition-colors"
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={handleAddToCart} className="w-full">
                ADD TO CART
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
