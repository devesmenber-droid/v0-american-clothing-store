import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="h-20 w-20 mx-auto mb-6 text-foreground" />
          <h1 className="text-4xl font-bold mb-4">ORDER CONFIRMED!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="bg-secondary border border-border p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-2">Order Number</p>
            <p className="text-2xl font-bold">#{Math.floor(Math.random() * 1000000)}</p>
          </div>
          <p className="text-muted-foreground mb-8">
            You will receive an email confirmation shortly with your order details and tracking information.
          </p>
          <Link href="/">
            <Button size="lg">CONTINUE SHOPPING</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
