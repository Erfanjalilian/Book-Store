'use client'

import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

interface Comment {
  id: string
  product_id: string
  user_name: string
  rating: number
  comment: string
  created_at: string
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch('https://683dc34a199a0039e9e6c8b6.mockapi.io/comments')
        const data = await res.json()
        setComments(data)
      } catch (error) {
        console.error('خطا در دریافت نظرات کاربران:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [])

  if (loading) {
    return <div className="text-center py-10 text-gray-500">در حال بارگذاری نظرات...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-right">💬 نظرات کاربران</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {comments.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">{item.user_name}</h3>
                <span className="text-sm text-gray-400">{item.created_at}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{item.comment}</p>
            </div>

            <div className="flex gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < item.rating ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
