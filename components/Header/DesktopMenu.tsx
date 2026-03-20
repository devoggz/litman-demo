"use client";

import type { MenuItem } from "./types";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface DesktopMenuProps {
  menuData: MenuItem[];
  stickyMenu: boolean;
}

const DesktopMenu = ({ menuData, stickyMenu }: DesktopMenuProps) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = (index: number) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav>
      <ul className="flex items-center gap-6">
        {menuData.map((menuItem, i) => (
          <li
            key={i}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            {menuItem.submenu ? (
              <>
                <button
                  className={`flex items-center gap-1 hover:text-blue font-medium ${stickyMenu ? "py-4" : "py-6"} relative text-sm font-medium ${menuItem.submenu?.some((subItem) => pathname === subItem.path) ? "text-blue" : "text-dark"}`}
                >
                  {menuItem.title}
                  <svg
                    className={`transition-transform duration-200 ${
                      activeDropdown === i ? "rotate-180" : ""
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

                {/* Dropdown Menu */}
                <div
                  className={`absolute left-0 border border-gray-2 top-full bg-white shadow-lg rounded-lg p-2 min-w-[220px] z-50 transform transition-all duration-200 ${
                    activeDropdown === i
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 translate-y-2 invisible"
                  }`}
                >
                  {menuItem.submenu.map((subItem, j) => (
                    <Link
                      key={j}
                      className={`block px-4 py-2 text-sm font-medium rounded-lg hover:text-blue hover:bg-gray-2 ${subItem.path && pathname.split("?")[0] === subItem.path.split("?")[0] ? "text-blue" : "text-dark"}`}
                      href={subItem.path || "#"}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                className={`hover:text-green-bright font-medium ${stickyMenu ? "py-4" : "py-6"} block relative text-sm ${menuItem.path && pathname.split("?")[0] === menuItem.path.split("?")[0] ? "text-dark-6" : "text-dark-6"}`}
                href={menuItem.path || "#"}
              >
                {menuItem.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopMenu;
