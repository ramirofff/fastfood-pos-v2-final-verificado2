"use client";
import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductEditor() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("productList");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  const handleUpdate = (index: number, field: keyof Product, value: string | number) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
    localStorage.setItem("productList", JSON.stringify(updated));
  };

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        handleUpdate(index, "image", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Editar productos</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No hay productos cargados.</p>
      ) : (
        products.map((prod, index) => (
          <div key={index} className="border rounded p-3 mb-4">
            <div className="mb-2">
              <label className="text-sm">Nombre</label>
              <input
                type="text"
                value={prod.name}
                onChange={(e) => handleUpdate(index, "name", e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div className="mb-2">
              <label className="text-sm">Precio</label>
              <input
                type="number"
                value={prod.price}
                onChange={(e) => handleUpdate(index, "price", parseFloat(e.target.value))}
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div className="mb-2">
              <label className="text-sm">Imagen</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleImageUpload(index, e.target.files[0])
                }
                className="w-full"
              />
              {prod.image && (
                <img src={prod.image} alt={prod.name} className="mt-2 w-32 rounded-md" />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
