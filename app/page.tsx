import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/store"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative h-[70vh] flex items-center justify-center bg-secondary border-b border-border">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-balance">AMERICAN STYLE</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Premium clothing designed for the modern American lifestyle
            </p>
            <Button size="lg" className="text-lg px-8">
              SHOP NOW
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">NEW ARRIVALS</h2>
            <Link href="/" className="text-sm font-medium hover:underline">
              VIEW ALL
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="bg-secondary border-y border-border py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <h3 className="text-xl font-bold mb-2">FREE SHIPPING</h3>
                <p className="text-muted-foreground">On orders over $100</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">EASY RETURNS</h3>
                <p className="text-muted-foreground">30-day return policy</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">PREMIUM QUALITY</h3>
                <p className="text-muted-foreground">Made in the USA</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
