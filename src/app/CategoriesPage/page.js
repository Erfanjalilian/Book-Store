'use client'

import { useState, useEffect } from 'react'
import { useProductContext } from '@/app/Contexts/ProductContext'
import Link from 'next/link'
import Image from 'next/image'

export default function CategoriesPage() {
  const {
    allProducts,
    filteredProducts,
    selectedCategories,
    setSelectedCategories,
    selectedPublishers,
    setSelectedPublishers,
    selectedLanguages,
    setSelectedLanguages,
    selectedPriceRange,
    setSelectedPriceRange,
  } = useProductContext()

  const [categories, setCategories] = useState([])
  const [min, setMin] = useState(selectedPriceRange.min)
  const [max, setMax] = useState(selectedPriceRange.max)

  const publishers = Array.from(new Set(allProducts.map((p) => p.publisher)))
  const languages = Array.from(new Set(allProducts.map((p) => p.language)))

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(allProducts.map((p) => p.categories)))
    setCategories(uniqueCategories)
  }, [allProducts])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedPriceRange({ min, max })
    }, 500)

    return () => clearTimeout(timer)
  }, [min, max, setSelectedPriceRange])

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const togglePublisher = (publisher) => {
    if (selectedPublishers.includes(publisher)) {
      setSelectedPublishers(selectedPublishers.filter((p) => p !== publisher))
    } else {
      setSelectedPublishers([...selectedPublishers, publisher])
    }
  }

  const toggleLanguage = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== language))
    } else {
      setSelectedLanguages([...selectedLanguages, language])
    }
  }

  // تابع کمکی برای گرفتن قیمت نهایی (تخفیف خورده یا قیمت اصلی)
  const getFinalPrice = (product) => {
    if (!product) return 0
    const hasDiscount =
      typeof product.discount_price === 'number' &&
      product.discount_price > 0 &&
      product.discount_price < product.price
    return hasDiscount ? product.discount_price : product.price
  }

  // تابع کمکی برای گرفتن درصد تخفیف
  const getDiscountPercent = (product) => {
    if (
      typeof product.discount_price === 'number' &&
      product.discount_price > 0 &&
      product.discount_price < product.price
    ) {
      const diff = product.price - product.discount_price
      return Math.round((diff / product.price) * 100)
    }
    return 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 text-right">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b pb-4">دسته‌بندی کتاب‌ها</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4 bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-4 h-fit z-10">
            <div className="space-y-8">
              {/* فیلتر دسته‌بندی */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">دسته‌بندی</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                        selectedCategories.includes(category)
                          ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* فیلتر ناشر */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">ناشر</h2>
                <div className="flex flex-wrap gap-2">
                  {publishers.map((publisher) => (
                    <button
                      key={publisher}
                      onClick={() => togglePublisher(publisher)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                        selectedPublishers.includes(publisher)
                          ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {publisher}
                    </button>
                  ))}
                </div>
              </div>

              {/* فیلتر قیمت */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">محدوده قیمت (تومان)</h2>
                <div className="flex gap-4 items-center">
                  <input
                    type="number"
                    min={0}
                    value={min}
                    onChange={(e) => setMin(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="حداقل"
                  />
                  <span className="text-gray-500">تا</span>
                  <input
                    type="number"
                    min={0}
                    value={max}
                    onChange={(e) => setMax(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="حداکثر"
                  />
                </div>
              </div>

              {/* فیلتر زبان */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">زبان</h2>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => toggleLanguage(language)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                        selectedLanguages.includes(language)
                          ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-500 text-lg">هیچ محصولی با این فیلتر یافت نشد.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const finalPrice = getFinalPrice(product)
                  const discountPercent = getDiscountPercent(product)
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                      <Link href={`/CategoriesPage/${product.id}`} className="block">
                        <div className="relative w-full h-64 overflow-hidden">
                          <Image
                            src={product.cover_image}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{product.title}</h3>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-1">{product.author}</p>

                          <div className="flex justify-between items-center">
                            <span className="font-bold text-green-600 text-lg">
                              {finalPrice.toLocaleString()} تومان
                            </span>

                            {discountPercent > 0 && (
                              <span className="text-lg line-through text-gray-400">
                                {product.price.toLocaleString()} تومان
                              </span>
                            )}

                            {discountPercent > 0 && (
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                                {discountPercent}% تخفیف
                              </span>
                            )}

                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                              ⭐ {product.average_rating}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
