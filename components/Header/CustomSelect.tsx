"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Category } from "@/types/category";

const CustomSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{ title: string }>({
    title: "All Categories",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: Category) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const result = await res.json();

        if (result?.success) {
          setCategories(result.data);
        }
      } catch {
        // intentionally silent (prod-safe)
      }
    };

    fetchCategories();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="dropdown-content custom-select relative"
      style={{ width: "200px" }}
    >
      {/* Trigger */}
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`select-selected whitespace-nowrap leading-[22px] w-full text-left ${
          isOpen ? "select-arrow-active" : ""
        }`}
        type="button"
        onClick={toggleDropdown}
      >
        {selectedOption.title}
      </button>

      {/* Dropdown */}
      <div
        className={`select-items ${isOpen ? "" : "select-hide"}`}
        role="listbox"
      >
        {categories.map((option) => (
          <button
            key={String(option.slug)}
            aria-selected={selectedOption === option}
            className={`select-item w-full text-left ${
              selectedOption === option ? "same-as-selected" : ""
            }`}
            role="option"
            type="button"
            onClick={() => handleOptionClick(option)}
          >
            <Link
              className="block w-full"
              href={`/categories/${String(option.slug)}`}
            >
              {option.title}
            </Link>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
