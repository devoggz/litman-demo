"use client";

import { useState, useRef, useEffect } from "react";

interface CustomDropdownProps {
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selected,
  setSelected,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative text-white">
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-2.5 text-sm"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected}
        <svg
          aria-hidden="true"
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          height="17"
          viewBox="0 0 17 17"
          width="17"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3374 6.41663L8.50407 10.5833L12.6707 6.41663"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      {open && (
        <ul
          className="absolute z-10 w-40 p-2 mt-2 overflow-hidden text-black bg-white rounded-md shadow-lg"
          role="listbox"
        >
          {options.map((option) => (
            <li key={option} aria-selected={selected === option} role="option">
              <button
                className="w-full px-4 py-2 text-sm font-medium text-left rounded-lg hover:bg-gray-3 text-dark"
                type="button"
                onClick={() => {
                  setSelected(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const DropdownGroup: React.FC = () => {
  const [country, setCountry] = useState<string>("United State");
  const [currency, setCurrency] = useState<string>("USD");

  return (
    <div className="flex items-center gap-6">
      <CustomDropdown
        options={["United State", "Canada", "United Kingdom"]}
        selected={country}
        setSelected={setCountry}
      />
      <CustomDropdown
        options={["USD", "CAD", "GBP"]}
        selected={currency}
        setSelected={setCurrency}
      />
    </div>
  );
};

export default DropdownGroup;
