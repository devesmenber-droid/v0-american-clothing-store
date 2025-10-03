export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  sizes: string[]
}

export interface CartItem extends Product {
  quantity: number
  size: string
}

export interface User {
  id: string
  name: string
  email: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White Tee",
    price: 29.99,
    image: "/white-t-shirt-on-black-background.jpg",
    category: "T-Shirts",
    description: "Premium cotton classic white t-shirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "2",
    name: "Black Denim Jacket",
    price: 89.99,
    image: "/black-denim-jacket-minimal.jpg",
    category: "Jackets",
    description: "Timeless black denim jacket",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "3",
    name: "Grey Hoodie",
    price: 59.99,
    image: "/grey-hoodie-minimal-style.jpg",
    category: "Hoodies",
    description: "Comfortable grey cotton hoodie",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "4",
    name: "Black Joggers",
    price: 49.99,
    image: "/black-joggers-athletic.jpg",
    category: "Pants",
    description: "Athletic fit black joggers",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "5",
    name: "White Sneakers",
    price: 79.99,
    image: "/white-sneakers-minimal-clean.jpg",
    category: "Shoes",
    description: "Clean white leather sneakers",
    sizes: ["7", "8", "9", "10", "11", "12"],
  },
  {
    id: "6",
    name: "Black Cap",
    price: 24.99,
    image: "/black-baseball-cap.jpg",
    category: "Accessories",
    description: "Classic black baseball cap",
    sizes: ["One Size"],
  },
  {
    id: "7",
    name: "Striped Long Sleeve",
    price: 39.99,
    image: "/black-white-striped-shirt.jpg",
    category: "T-Shirts",
    description: "Black and white striped long sleeve",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "8",
    name: "Leather Belt",
    price: 34.99,
    image: "/black-leather-belt.png",
    category: "Accessories",
    description: "Premium black leather belt",
    sizes: ["S", "M", "L", "XL"],
  },
]
