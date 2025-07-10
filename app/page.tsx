"use client";
import React, { useState, useEffect } from "react";
import CategorySelector from "./components/CategorySelector";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Receipt from "./components/Receipt";
import SalesHistory from "./components/SalesHistory";
import ProductEditor from "./components/ProductEditor";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("productList");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <main className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">FastFood POS</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Zona de productos */}
        <div>
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <ProductList
            products={products}
            selectedCategory={selectedCategory}
            addToCart={(product) => setCart([...cart, product])}
          />
        </div>

        {/* Carrito y recibo */}
        <div>
          <Cart
            cart={cart}
            setCart={setCart}
            onCheckout={(items, total, discount) => {
              const today = new Date().toISOString().split("T")[0];
              const now = new Date().toLocaleTimeString();

              const sale = {
                items,
                total,
                discount,
                date: now,
              };

              const data = JSON.parse(localStorage.getItem("salesHistory") || "{}");
              if (!data[today]) data[today] = [];
              data[today].push(sale);
              localStorage.setItem("salesHistory", JSON.stringify(data));

              window.print(); // imprimir ticket
              setCart([]);
            }}
          />

          <Receipt items={cart} total={cart.reduce((a, p) => a + p.price, 0)} />
        </div>
      </div>

      {/* Editor de productos */}
      <ProductEditor />

      {/* Historial */}
      <SalesHistory />
    </main>
  );
}
