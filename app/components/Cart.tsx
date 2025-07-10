"use client";
import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Props {
  cartItems: Product[];
  onClearCart: () => void;
}

export default function Cart({ cartItems, onClearCart }: Props) {
  const [discount, setDiscount] = useState<number>(0);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const total = Math.max(0, subtotal - discount);

  const handleConfirmPurchase = () => {
    const today = new Date().toISOString().split("T")[0];
    const prev = JSON.parse(localStorage.getItem("salesHistory") || "{}");

    const history = {
      ...prev,
      [today]: [
        ...(prev[today] || []),
        {
          items: cartItems.map((item) => ({ name: item.name, price: item.price })),
          discount,
          total,
          date: new Date().toLocaleTimeString(),
        },
      ],
    };

    localStorage.setItem("salesHistory", JSON.stringify(history));

    window.print();
    onClearCart();
    setDiscount(0);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2">Carrito</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="flex justify-between border-b py-1">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-2">
        <label className="block text-sm">Descuento (monto en $):</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          className="w-full border rounded p-1 mt-1"
          placeholder="0.00"
        />
      </div>

      <div className="mt-4 font-bold text-lg flex justify-between">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700"
        onClick={handleConfirmPurchase}
      >
        Confirmar venta
      </button>
    </div>
  );
}

