'use client'

import { useEffect, useState } from 'react'
import { useProductContext } from '@/app/Contexts/ProductContext'

export default function PublisherFilter() {
  const {
    allProducts,
    selectedPublishers,
    setSelectedPublishers,
  } = useProductContext()

  const [uniquePublishers, setUniquePublishers] = useState<string[]>([])

  useEffect(() => {
    const publishers = Array.from(
      new Set(allProducts.map((product) => product.publisher))
    )
    setUniquePublishers(publishers)
  }, [allProducts])

  const handleToggle = (publisher: string) => {
    if (selectedPublishers.includes(publisher)) {
      setSelectedPublishers(
        selectedPublishers.filter((item) => item !== publisher)
      )
    } else {
      setSelectedPublishers([...selectedPublishers, publisher])
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <h3 className="text-lg font-bold mb-3 text-right text-gray-800">
        فیلتر بر اساس ناشر
      </h3>
      <ul className="space-y-2 text-right">
        {uniquePublishers.map((publisher) => (
          <li
            key={publisher}
            className="flex items-center justify-end gap-2 text-sm text-gray-700"
          >
            <label className="cursor-pointer">
              {publisher}
            </label>
            <input
              type="checkbox"
              checked={selectedPublishers.includes(publisher)}
              onChange={() => handleToggle(publisher)}
              className="w-4 h-4 accent-blue-600"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
