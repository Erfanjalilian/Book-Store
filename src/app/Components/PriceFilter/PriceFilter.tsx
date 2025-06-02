'use client'

import { useEffect, useState } from 'react'
import { useProductContext } from '@/app/Contexts/ProductContext'

export default function PriceFilter() {
  const {
    allProducts,
    minPrice,
    maxPrice,
    selectedPriceRange,
    setSelectedPriceRange,
  } = useProductContext()

  const [localMin, setLocalMin] = useState(0)
  const [localMax, setLocalMax] = useState(0)

  useEffect(() => {
    const prices = allProducts.map((p) => p.discount_price || p.price)
    const min = Math.min(...prices)
    const max = Math.max(...prices)

    setLocalMin(min)
    setLocalMax(max)

    // مقدار اولیه برای رنج انتخابی
    if (selectedPriceRange.min === 0 && selectedPriceRange.max === 0) {
      setSelectedPriceRange({ min, max })
    }
  }, [allProducts])

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value, 10)
    setSelectedPriceRange((prev) => ({ ...prev, min: newMin }))
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value, 10)
    setSelectedPriceRange((prev) => ({ ...prev, max: newMax }))
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <h3 className="text-lg font-bold mb-3 text-right text-gray-800">
        فیلتر بر اساس قیمت
      </h3>
      <div className="flex items-center justify-between gap-2 text-sm text-gray-600">
        <div className="flex flex-col text-right w-1/2">
          <label className="mb-1">حداقل قیمت (تومان)</label>
          <input
            type="number"
            value={selectedPriceRange.min}
            min={localMin}
            max={selectedPriceRange.max}
            onChange={handleMinChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>
        <div className="flex flex-col text-right w-1/2">
          <label className="mb-1">حداکثر قیمت (تومان)</label>
          <input
            type="number"
            value={selectedPriceRange.max}
            min={selectedPriceRange.min}
            max={localMax}
            onChange={handleMaxChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>
      </div>
    </div>
  )
}
