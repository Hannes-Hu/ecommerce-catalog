export interface ProductFilter {
  searchTerm: string;
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc' | 'name-desc' | null;
}

export interface FilterOptions {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
}