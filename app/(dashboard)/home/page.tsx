"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Table from "@/app/components/home/Table/Table";
import AppInput from "@/app/components/input/AppInput";
import Dropdown from "@/app/components/dropdown/Dropdown";
import { icons } from "@/public/assets/icons";
import { statusFilterOptions } from "@/constants/constants";
import { fetchCharacters, type Character } from "@/services/characterService";
import Loader from "@/app/components/loader/Loader";
import toast from "react-hot-toast";
import { updateURL } from "@/utils/helper";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state from URL params
  const [searchValue, setSearchValue] = useState(searchParams.get("name") || "");
  const [selectedFilter, setSelectedFilter] = useState<string | number>(
    searchParams.get("status") || "all"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Debounce search input
  const [debouncedSearch, setDebouncedSearch] = useState(searchParams.get("name") || "");

  // Update URL when filters or page change
  const handleUpdateURL = useCallback(() => {
    updateURL({
      router,
      basePath: "/home",
      params: {
        name: debouncedSearch,
        status: selectedFilter,
        page: currentPage,
      },
      excludeValues: ["all", ""],
    });
  }, [debouncedSearch, selectedFilter, currentPage, router]);

  useEffect(() => {
    handleUpdateURL();
  }, [handleUpdateURL]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
      if (searchValue !== debouncedSearch) {
        setCurrentPage(1); // Reset to page 1 when search changes
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Fetch characters when filters or page change
  const loadCharacters = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchCharacters({
        name: debouncedSearch || undefined,
        status: selectedFilter !== "all" ? String(selectedFilter) : undefined,
        page: currentPage,
      });
      
      setCharacters(response.results);
      setTotalPages(response.info.pages);
      setTotalItems(response.info.count);
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch characters";
      setError(errorMessage);
      setCharacters([]);
      setTotalPages(0);
      setTotalItems(0);
      // Show toast notification for errors
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, selectedFilter, currentPage]);

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="h-full overflow-y-auto p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          Character List
        </h1>
        <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-6 flex-1 min-h-0 flex flex-col">
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-[300px_200px] gap-3 sm:gap-4">
            <AppInput
              name="search"
              placeholder="Search..."
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              icon={icons.search}
            />
            <Dropdown
              options={statusFilterOptions}
              value={selectedFilter}
              onChange={(value) => {
                setSelectedFilter(value);
                setCurrentPage(1); // Reset to page 1 when filter changes
              }}
              placeholder="Filter by status"
            />
          </div>
          <div className="flex-1 min-h-0">
            {error ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-error text-sm sm:text-base">{error}</p>
              </div>
            ) : (
              <Table
                data={characters}
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                onPageChange={handlePageChange}
                loading={loading}
                noResultsMessage="No results found"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
