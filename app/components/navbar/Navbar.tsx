"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "@/store/actions/authActions";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const user = useSelector((state: any) => state.auth.user);
  
  const userName = user?.name || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  const tabs = [
    { name: "Home", path: "/home" },
  ];

  const isActiveTab = (tabPath: string) => {
    return pathname === tabPath;
  };

  const handleLogout = () => {
    dispatch(logout() as any);
    router.push("/login");
  };

  const handleTabClick = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Burger menu (mobile) and Tabs (desktop) */}
          <div className="flex items-center">
            {/* Burger menu button - visible on small screens */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Tabs - visible on medium screens and up */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
              {tabs.map((tab) => {
                const isActive = isActiveTab(tab.path);
                return (
                  <button
                    key={tab.name}
                    onClick={() => router.push(tab.path)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors lg:px-4 lg:text-base ${
                      isActive
                        ? "text-primary-600 bg-primary-50"
                        : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="absolute top-16 left-0 right-0 md:hidden bg-white border-b border-gray-200 shadow-lg z-40"
            >
              <div className="px-4 py-2">
                {tabs.map((tab) => {
                  const isActive = isActiveTab(tab.path);
                  return (
                    <button
                      key={tab.name}
                      onClick={() => handleTabClick(tab.path)}
                      className={`w-full text-left px-4 py-3 text-base font-medium rounded-md transition-colors ${
                        isActive
                          ? "text-primary-600 bg-primary-50"
                          : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                      }`}
                    >
                      {tab.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Right side - User info with dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 sm:space-x-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-600 text-white text-sm sm:text-base font-semibold">
                  {userInitial}
                </div>
                <span className="hidden sm:block text-sm sm:text-base font-medium text-gray-700">
                  {userName}
                </span>
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
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

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-error hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
