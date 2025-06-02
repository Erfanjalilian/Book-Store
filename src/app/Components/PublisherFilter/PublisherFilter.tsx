'use client'

import { useEffect, useState } from 'react'
import { useProductContext } from '@/app/Contexts/ProductContext'

export default function PublisherFilter() {
  const { allProducts, selectedPublishers, setSelectedPublishers } = useProductContext()
  const [uniquePublishers, setUniquePublishers] = useState<string[]>([])

  useEffect(() => {
    const publishers = Array.from(new Set(allProducts.map((p) => p.publisher)))
    setUniquePublishers(publishers)
  }, [allProducts])

  const handleToggle = (publisher: string) => {
    if (selectedPublishers.includes(publisher)) {
      setSelectedPublishers(selectedPublishers.filter((p) => p !== publisher))
    } else {
      setSelectedPublishers([...selectedPublishers, publisher])
    }
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-right">فیلتر بر اساس ناشر</h3>
      <ul className="space-y-2 text-right">
        {uniquePublishers.map((publisher) => (
          <li key={publisher} className="flex items-center justify-end gap-2">
            <label className="text-sm text-gray-700">
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
