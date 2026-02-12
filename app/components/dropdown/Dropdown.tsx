"use client";

import { useState, useRef, useEffect } from "react";

export interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string | number;
  placeholder?: string;
  onChange?: (value: string | number) => void;
  className?: string;
  disabled?: boolean;
  label?: string;
}

export default function Dropdown({
  options,
  value,
  placeholder = "Select an option",
  onChange,
  className = "",
  disabled = false,
  label,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 sm:text-base mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-offset-0 bg-white sm:text-base sm:px-4 sm:py-2.5
          ${disabled 
            ? "cursor-not-allowed opacity-50 bg-gray-50" 
            : "cursor-pointer hover:border-gray-400"
          }
          ${isOpen
            ? "border-primary-500 focus:border-primary-500 focus:ring-primary-500"
            : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
          }
        `}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`h-5 w-5 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 max-h-60 overflow-auto focus:outline-none">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              No options available
            </div>
          ) : (
            <ul className="py-1">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    disabled={option.disabled}
                    className={`
                      w-full text-left px-4 py-2 text-sm transition-colors
                      ${
                        option.value === value
                          ? "bg-primary-50 text-primary-600 font-medium"
                          : "text-gray-900 hover:bg-gray-50"
                      }
                      ${
                        option.disabled
                          ? "cursor-not-allowed opacity-50 bg-gray-50"
                          : "cursor-pointer"
                      }
                    `}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
