"use client";

import { useEffect, useState } from "react";
import CategorySelector from "./components/CategorySelector";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Receipt from "./components/Receipt";

const categories = [
  {
    name: "Burgers",
    products: [
      { id: 1, name: "🍔 Hamburguesa Clásica", price: 5 },
      { id: 2, name: "🍔 Doble Hamburguesa", price: 7 },
    ],
  },
  {
    name: "Sides",
    products: [
      { id: 3, name: "🍟 Papas Fritas", price: 3 },
      { id: 4, name: "🧀 Nachos", price: 4 },
    ],
  },
  {
    name: "Drinks",
    products: [
      { id: 5, name: "🥤 Bebida", price: 2 },
      { id: 6, name: "☕ Café", price: 2 },
    ],
  },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Burgers");
  const [showReceipt, setShowReceipt] = useState(false);

  // Cargar carrito desde localStorage al inicio
  useEffect(() => {
    const stored = localStorage.getItem("fastfood_cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("fastfood_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  const handlePayment = async () => {
    setShowReceipt(true);

    // ⚠️ Preparado para integrar Stripe:
    /*
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ items: cart }),
    });
    const session = await res.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
    */
  };

  return (
    <main className="max-w-6xl mx-auto p-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">🍟 FastFood POS</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <ProductList
            products={categories.find((cat) => cat.name === selectedCategory)?.products || []}
            addToCart={addToCart}
          />
        </div>
        <Cart cart={cart} removeFromCart={removeFromCart} onPay={handlePayment} />
      </div>

      {showReceipt && <Receipt cart={cart} onClose={() => setShowReceipt(false)} />}
    </main>
  );
}
