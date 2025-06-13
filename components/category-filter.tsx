"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { Category } from "@/types"

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
}

export function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleCategoryChange = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams)
    if (categorySlug === "all") {
      params.delete("category")
    } else {
      params.set("category", categorySlug)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      <Button variant={selectedCategory === "all" ? "default" : "outline"} onClick={() => handleCategoryChange("all")}>
        Tất cả
      </Button>
      {categories.map((category) => (
        <Button
          key={category._id}
          variant={selectedCategory === category.slug ? "default" : "outline"}
          onClick={() => handleCategoryChange(category.slug)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}
