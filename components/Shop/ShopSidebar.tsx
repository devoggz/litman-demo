"use client";
import { useState } from "react";

import { Category } from "@/types/category";

type Props = {
  categories: Category[];
  totalProducts: number;
  onFilterChange: (filters: FilterState) => void;
};

export type FilterState = {
  selectedCategory: string | null;
  priceRange: [number, number];
  selectedSizes: string[];
  selectedColors: string[];
  sortBy: "default" | "price-asc" | "price-desc";
};

export default function ShopSidebar({ categories, onFilterChange }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 999]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    size: true,
    colors: true,
    price: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryClick = (categorySlug: string) => {
    const newCategory = selectedCategory === categorySlug ? null : categorySlug;

    setSelectedCategory(newCategory);
    onFilterChange({
      selectedCategory: newCategory,
      priceRange,
      selectedSizes,
      selectedColors,
      sortBy: "default",
    });
  };

  const handlePriceChange = (newMax: number) => {
    const newRange: [number, number] = [priceRange[0], newMax];

    setPriceRange(newRange);
    onFilterChange({
      selectedCategory,
      priceRange: newRange,
      selectedSizes,
      selectedColors,
      sortBy: "default",
    });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];

    setSelectedSizes(newSizes);
    onFilterChange({
      selectedCategory,
      priceRange,
      selectedSizes: newSizes,
      selectedColors,
      sortBy: "default",
    });
  };

  const handleColorToggle = (colorName: string) => {
    const newColors = selectedColors.includes(colorName)
      ? selectedColors.filter((c) => c !== colorName)
      : [...selectedColors, colorName];

    setSelectedColors(newColors);
    onFilterChange({
      selectedCategory,
      priceRange,
      selectedSizes,
      selectedColors: newColors,
      sortBy: "default",
    });
  };

  const handleClearAll = () => {
    setSelectedCategory(null);
    setPriceRange([0, 999]);
    setSelectedSizes([]);
    setSelectedColors([]);
    onFilterChange({
      selectedCategory: null,
      priceRange: [0, 999],
      selectedSizes: [],
      selectedColors: [],
      sortBy: "default",
    });
  };

  const colors = [
    { name: "Gray", hex: "#808080" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Black", hex: "#000000" },
    { name: "Green", hex: "#008000" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "White", hex: "#FFFFFF", border: true },
    { name: "Red", hex: "#FF0000" },
  ];

  const sizes = ["XL", "XXL"];

  return (
    <div className="space-y-6">
      {/* Filters Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-dark-6">Filters:</h3>
        <button
          className="text-sm text-green-bright hover:underline"
          onClick={handleClearAll}
        >
          Clean All
        </button>
      </div>

      {/* Category Filter */}
      <div className="border-t border-gray-3 pt-6">
        <button
          className="flex items-center justify-between w-full mb-4"
          onClick={() => toggleSection("category")}
        >
          <h4 className="text-base font-semibold text-dark-6">Category</h4>
          <svg
            className={`w-5 h-5 transition-transform ${
              expandedSections.category ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 9l-7 7-7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>

        {expandedSections.category && (
          <ul className="space-y-6">
            {categories.map((category) => {
              const categorySlug = String(category.slug);

              return (
                <li key={category.id}>
                  <button
                    className={`flex items-center justify-between text-sm w-full text-left transition ${
                      selectedCategory === categorySlug
                        ? "text-green-bright font-semibold"
                        : "text-dark-4 hover:text-green-bright"
                    }`}
                    onClick={() => handleCategoryClick(categorySlug)}
                  >
                    <span>{category.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Size Filter */}
      <div className="border-t border-gray-3 pt-6">
        <button
          className="flex items-center justify-between w-full mb-4"
          onClick={() => toggleSection("size")}
        >
          <h4 className="text-base font-semibold text-dark-6">Size</h4>
          <svg
            className={`w-5 h-5 transition-transform ${
              expandedSections.size ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 9l-7 7-7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>

        {expandedSections.size && (
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`px-4 py-2 text-sm border rounded-lg transition ${
                  selectedSizes.includes(size)
                    ? "border-blue text-blue bg-blue/5"
                    : "border-gray-3 hover:border-blue hover:text-blue"
                }`}
                onClick={() => handleSizeToggle(size)}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Colors Filter */}
      <div className="border-t border-gray-3 pt-6">
        <button
          className="flex items-center justify-between w-full mb-4"
          onClick={() => toggleSection("colors")}
        >
          <h4 className="text-base font-semibold text-dark">Colors</h4>
          <svg
            className={`w-5 h-5 transition-transform ${
              expandedSections.colors ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 9l-7 7-7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>

        {expandedSections.colors && (
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                className={`w-7 h-7 rounded-full border-2 transition ${
                  selectedColors.includes(color.name)
                    ? "border-green-bright ring-2 ring-green-bright ring-offset-2"
                    : color.border
                      ? "border-gray-3 hover:border-green-bright"
                      : "border-transparent hover:border-green-bright"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                onClick={() => handleColorToggle(color.name)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border-t border-gray-3 pt-6">
        <button
          className="flex items-center justify-between w-full mb-4"
          onClick={() => toggleSection("price")}
        >
          <h4 className="text-base font-semibold text-dark">Price</h4>
          <svg
            className={`w-5 h-5 transition-transform ${
              expandedSections.price ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 9l-7 7-7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>

        {expandedSections.price && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-dark-4">{priceRange[0]}</span>
              <span className="text-sm text-dark-4">{priceRange[1]}</span>
            </div>

            <div className="relative">
              <input
                className="w-full h-2 bg-gray-3 rounded-lg appearance-none cursor-pointer accent-green-bright"
                max="999"
                min="0"
                type="range"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(parseInt(e.target.value))}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
