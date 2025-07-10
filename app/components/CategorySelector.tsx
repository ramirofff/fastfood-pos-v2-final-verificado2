"use client";
import React from "react";

interface Props {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export default function CategorySelector({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Categorías</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setSelectedCategory(selectedCategory === cat ? null : cat)
            }
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
