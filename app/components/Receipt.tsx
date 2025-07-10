"use client";
import React from "react";

interface ReceiptItem {
  name: string;
  price: number;
}

interface Props {
  items: ReceiptItem[];
  total: number;
}

export default function Receipt({ items, total }: Props) {
  return (
    <div className="hidden print:block p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Ticket de compra</h2>
      <ul>
        {items.map((item, i) => (
          <li key={i} className="flex justify-between border-b py-1 text-sm">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-lg font-bold flex justify-between">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
