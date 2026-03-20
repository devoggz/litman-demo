"use client";

import type { MenuItem } from "./types";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { CloseIcon } from "./icons";

interface MobileMenuProps {
  headerLogo: string | null;
  isOpen: boolean;
  onClose: () => void;
  menuData: MenuItem[];
}

const MobileMenu = ({
  isOpen,
  onClose,
  menuData,
  headerLogo,
}: MobileMenuProps) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        isOpen &&
        !target.closest(".mobile-menu-container") &&
        !target.closest("#Toggle")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleSubmenu = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  return (
    <>
      {/* Overlay */}
      <button
        aria-label="Close menu overlay"
        className={`fixed inset-0 bg-dark/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        type="button"
        onClick={onClose}
      />

      {/* Offcanvas Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] max-w-full bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out mobile-menu-container ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-3">
            <div>
              <Link className="block shrink-0" href="/">
                <Image
                  priority
                  alt="Logo"
                  height={70}
                  src={headerLogo || "/images/logo/logo-icon.svg"}
                  width={70}
                />
              </Link>
            </div>
            <button
              aria-label="Close menu"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              type="button"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-2 overflow-y-auto">
            <nav>
              <ul className="px-2">
                {menuData.map((menuItem, i) => (
                  <li key={i}>
                    {menuItem.submenu ? (
                      <div>
                        <button
                          className="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-800 rounded-lg hover:text-blue text-dark hover:bg-gray-2"
                          type="button"
                          onClick={() => toggleSubmenu(i)}
                        >
                          <span className="font-medium">{menuItem.title}</span>
                          <svg
                            className={`transition-transform duration-200 ${
                              expandedItems.includes(i) ? "rotate-180" : ""
                            }`}
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>

                        {/* Submenu */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            expandedItems.includes(i) ? "max-h-96" : "max-h-0"
                          }`}
                        >
                          <div className="pl-4 bg-gray-50">
                            {menuItem.submenu.map((subItem, j) => (
                              <Link
                                key={j}
                                className="block px-4 py-3 text-sm rounded-lg hover:bg-gray-2 text-dark border-gray-3 hover:text-blue"
                                href={subItem.path || "#"}
                                onClick={onClose}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        className="block px-4 py-3 text-sm font-medium rounded-lg hover:text-blue text-dark hover:bg-gray-2"
                        href={menuItem.path || "#"}
                        onClick={onClose}
                      >
                        {menuItem.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-3">
            <div className="flex items-center gap-3">
              <Link
                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                href="/"
                onClick={onClose}
              >
                Sign In
              </Link>
              <Link
                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                href="/"
                onClick={onClose}
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
