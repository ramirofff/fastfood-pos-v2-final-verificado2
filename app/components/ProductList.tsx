"use client";
import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Props {
  products: Product[];
  selectedCategory: string | null;
  onAddToCart: (product: Product) => void;
}

export default function ProductList({ products, selectedCategory, onAddToCart }: Props) {
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {filteredProducts.map((product) => (
        <button
          key={product.id}
          onClick={() => onAddToCart(product)}
          className="rounded-2xl bg-white shadow-md p-2 hover:scale-105 transition-all duration-200 border"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded-xl mb-2"
          />
          <div className="text-center">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
