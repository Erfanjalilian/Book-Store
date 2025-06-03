'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export interface Product {
  id: string
  title: string
  author: string
  isbn: string
  price: number
  discount_price: number
  description: string
  cover_image: string
  publisher: string
  publication_date: string
  pages: number
  language: string
  categories: string
  stock: number
  sold_count: number
  average_rating: number
  reviews_count: number
  created_at: string
  updated_at: string
}

export interface PriceRange {
  min: number
  max: number
}

interface ProductContextType {
  allProducts: Product[]
  filteredProducts: Product[]
  selectedPublishers: string[]
  setSelectedPublishers: (publishers: string[]) => void
  selectedPriceRange: PriceRange
  setSelectedPriceRange: (range: PriceRange) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  selectedLanguages: string[]
  setSelectedLanguages: (languages: string[]) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>({ min: 0, max: 10000000 })
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://683dbdd7199a0039e9e6b54e.mockapi.io/Products')
        const data = await res.json()
        setAllProducts(data)
        setFilteredProducts(data)
      } catch (err) {
        console.error('خطا در دریافت محصولات:', err)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = [...allProducts]

    // فیلتر ناشر
    if (selectedPublishers.length > 0) {
      filtered = filtered.filter((product) => selectedPublishers.includes(product.publisher))
    }

    // فیلتر قیمت
    filtered = filtered.filter(
      (product) =>
        product.discount_price >= selectedPriceRange.min &&
        product.discount_price <= selectedPriceRange.max
    )

    // فیلتر دسته‌بندی
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.categories))
    }

    // فیلتر زبان
    if (selectedLanguages.length > 0) {
      filtered = filtered.filter((product) => selectedLanguages.includes(product.language))
    }

    setFilteredProducts(filtered)
  }, [
    selectedPublishers,
    selectedPriceRange,
    selectedCategories,
    selectedLanguages,
    allProducts,
  ])

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        filteredProducts,
        selectedPublishers,
        setSelectedPublishers,
        selectedPriceRange,
        setSelectedPriceRange,
        selectedCategories,
        setSelectedCategories,
        selectedLanguages,
        setSelectedLanguages,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProductContext باید داخل ProductProvider استفاده شود')
  }
  return context
}
