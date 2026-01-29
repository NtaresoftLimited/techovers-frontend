"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { COLORS, MATERIALS, SORT_OPTIONS } from "@/lib/constants/filters";
import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";

interface ProductFiltersProps {
  categories: ALL_CATEGORIES_QUERYResult;
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentColor = searchParams.get("color") ?? "";
  const currentMaterial = searchParams.get("material") ?? "";
  const currentSort = searchParams.get("sort") ?? "name";
  const urlMinPrice = Number(searchParams.get("minPrice")) || 0;
  const urlMaxPrice = Number(searchParams.get("maxPrice")) || 2000000;
  const currentInStock = searchParams.get("inStock") === "true";

  // Local state for price range (for smooth slider dragging)
  const [priceRange, setPriceRange] = useState<[number, number]>([
    urlMinPrice,
    urlMaxPrice,
  ]);

  // Sync local state when URL changes
  useEffect(() => {
    setPriceRange([urlMinPrice, urlMaxPrice]);
  }, [urlMinPrice, urlMaxPrice]);

  // Check which filters are active
  const isSearchActive = !!currentSearch;
  const isCategoryActive = !!currentCategory;
  const isColorActive = !!currentColor;
  const isMaterialActive = !!currentMaterial;
  const isPriceActive = urlMinPrice > 0 || urlMaxPrice < 2000000;
  const isInStockActive = currentInStock;

  const hasActiveFilters =
    isSearchActive ||
    isCategoryActive ||
    isColorActive ||
    isMaterialActive ||
    isPriceActive ||
    isInStockActive;

  // Count active filters
  const activeFilterCount = [
    isSearchActive,
    isCategoryActive,
    isColorActive,
    isMaterialActive,
    isPriceActive,
    isInStockActive,
  ].filter(Boolean).length;

  const updateParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === 0) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;
    updateParams({ q: searchQuery || null });
  };

  const handleClearFilters = () => {
    router.push("/", { scroll: false });
  };

  const clearSingleFilter = (key: string) => {
    if (key === "price") {
      updateParams({ minPrice: null, maxPrice: null });
    } else {
      updateParams({ [key]: null });
    }
  };

  // Helper for filter label with active indicator
  const FilterLabel = ({
    children,
    isActive,
    filterKey,
  }: {
    children: React.ReactNode;
    isActive: boolean;
    filterKey: string;
  }) => (
    <div className="mb-3 flex items-center justify-between">
      <span
        className={`block text-[10px] font-black uppercase tracking-widest ${isActive
          ? "text-[#108561]"
          : "text-zinc-500"
          }`}
      >
        {children}
      </span>
      {isActive && (
        <button
          type="button"
          onClick={() => clearSingleFilter(filterKey)}
          className="text-zinc-400 hover:text-black transition-colors"
          aria-label={`Clear ${filterKey} filter`}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-10 rounded-[2rem] border border-zinc-100 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
      {/* Search Result Section */}
      <div className="border-b border-zinc-100 pb-8">
        <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-1">
          Refine <span className="text-[#108561]">Browse</span>
        </h3>
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">
          {activeFilterCount} Tuning parameters active
        </p>
      </div>

      {/* Clear Filters - Show at top when active */}
      {hasActiveFilters && (
        <Button
          size="sm"
          onClick={handleClearFilters}
          className="w-full h-12 bg-zinc-900 text-white hover:bg-black rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-black/10"
        >
          <X className="mr-2 h-4 w-4" />
          Reset All Filters
        </Button>
      )}

      {/* Search */}
      <div>
        <FilterLabel isActive={isSearchActive} filterKey="q">
          Keyword Search
        </FilterLabel>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <Input
            name="search"
            placeholder="Type device name..."
            defaultValue={currentSearch}
            className={cn(
              "h-12 rounded-2xl bg-zinc-50 border-zinc-100 px-5 text-xs font-bold placeholder:text-zinc-400 focus-visible:ring-[#108561]/20",
              isSearchActive && "border-[#108561] bg-white ring-2 ring-[#108561]/10"
            )}
          />
          <Button type="submit" size="sm" className="h-12 px-5 bg-zinc-100 text-black hover:bg-zinc-200 rounded-2xl shadow-none">
            <X className="h-4 w-4 rotate-45" />
          </Button>
        </form>
      </div>

      {/* Category */}
      <div>
        <FilterLabel isActive={isCategoryActive} filterKey="category">
          Electronics Section
        </FilterLabel>
        <Select
          value={currentCategory || "all"}
          onValueChange={(value) =>
            updateParams({ category: value === "all" ? null : value })
          }
        >
          <SelectTrigger
            className={cn(
              "h-12 rounded-2xl bg-zinc-50 border-zinc-100 px-5 text-xs font-bold w-full",
              isCategoryActive && "border-[#108561] bg-white ring-2 ring-[#108561]/10"
            )}
          >
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-zinc-100 shadow-2xl p-2">
            <SelectItem value="all" className="rounded-xl text-xs font-bold uppercase tracking-widest">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category.slug ?? ""} className="rounded-xl text-xs font-bold uppercase tracking-widest">
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="pt-2">
        <FilterLabel isActive={isPriceActive} filterKey="price">
          Budget Range (TSh)
        </FilterLabel>
        <div className="flex justify-between items-end mb-6">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Minimal</span>
            <span className="text-xs font-black text-black">TSh {priceRange[0].toLocaleString()}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Maximal</span>
            <span className="text-xs font-black text-black">TSh {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
        <Slider
          min={0}
          max={2000000}
          step={50000}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          onValueCommit={([min, max]) =>
            updateParams({
              minPrice: min > 0 ? min : null,
              maxPrice: max < 2000000 ? max : null,
            })
          }
          className={cn(
            "mt-4",
            isPriceActive && "[&_[role=slider]]:border-[#108561] [&_[role=slider]]:ring-[#108561]/20 [&_[role=slider]]:bg-white"
          )}
        />
      </div>

      {/* In Stock Only */}
      <div className="pt-4">
        <label className="flex cursor-pointer items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-zinc-100 transition-all group">
          <span className={cn(
            "text-[10px] font-black uppercase tracking-widest transition-colors",
            isInStockActive ? "text-black" : "text-zinc-500 group-hover:text-zinc-700"
          )}>
            Availability: <span className="text-[#108561]">In Stock Only</span>
          </span>
          <input
            type="checkbox"
            checked={currentInStock}
            onChange={(e) =>
              updateParams({ inStock: e.target.checked ? "true" : null })
            }
            className="h-5 w-5 rounded-full border-zinc-300 text-[#108561] focus:ring-[#108561] transition-all cursor-pointer"
          />
        </label>
      </div>

      {/* Sort Options */}
      <div className="pt-4 opacity-70 hover:opacity-100 transition-opacity">
        <span className="mb-3 block text-[10px] font-black text-zinc-400 uppercase tracking-widest">
          Display Priority
        </span>
        <Select
          value={currentSort}
          onValueChange={(value) => updateParams({ sort: value })}
        >
          <SelectTrigger className="h-10 rounded-xl bg-transparent border-zinc-100 px-4 text-[10px] font-bold uppercase tracking-widest w-full border-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-zinc-100 shadow-xl p-2">
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value} className="rounded-lg text-[10px] font-bold uppercase tracking-widest">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
