import apiService from "./api";
import { endpoints } from "./endpoints";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
}

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface CharacterFilters {
  name?: string;
  status?: string;
  page?: number;
}

export const fetchCharacters = async (
  filters: CharacterFilters = {}
): Promise<CharactersResponse> => {
  const params: Record<string, string | number> = {};
  
  if (filters.name) {
    params.name = filters.name;
  }
  
  if (filters.status && filters.status !== "all") {
    params.status = filters.status.toLowerCase();
  }
  
  if (filters.page) {
    params.page = filters.page;
  }

  try {
    const response = await apiService.get<any>(endpoints.character, { params });
    
    // Check if API returned an error object (e.g., {error: "There is nothing here"})
    if (response.error) {
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      };
    }
    
    return response as CharactersResponse;
  } catch (error: any) {
    // Handle 404 as "no results found" instead of error
    if (error.message?.includes("404")) {
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      };
    }
    throw error;
  }
};
