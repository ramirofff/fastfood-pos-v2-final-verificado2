"use client";
import React, { useEffect, useState } from "react";

interface SaleItem {
  name: string;
  price: number;
}

interface Sale {
  items: SaleItem[];
  discount: number;
  total: number;
  date: string;
}

export default function SalesHistory() {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const data = JSON.parse(localStorage.getItem("salesHistory") || "{}");
    const todaySales: Sale[] = data[today] || [];
    setSales(todaySales);
  }, []);

  const totalSold = sales.reduce((acc, sale) => acc + sale.total, 0);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Historial de ventas (hoy)</h2>

      {sales.length === 0 ? (
        <p className="text-gray-500">No hay ventas registradas aún.</p>
      ) : (
        <div className="space-y-4">
          {sales.map((sale, index) => (
            <div
              key={index}
              className="border border-gray-200 p-2 rounded-md bg-gray-50"
            >
              <div className="text-sm text-gray-600">Hora: {sale.date}</div>
              <ul className="text-sm">
                {sale.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-2 font-semibold text-green-700">
                <span>Total venta:</span>
                <span>${sale.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 font-bold text-lg text-right">
        Total vendido hoy: ${totalSold.toFixed(2)}
      </div>
    </div>
  );
}
