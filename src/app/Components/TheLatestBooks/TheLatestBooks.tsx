'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { FaStar, FaHeart, FaShoppingCart, FaRegCalendarAlt } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment-jalaali'

moment.loadPersian({ usePersianDigits: false })

interface Product {
  id: string
  title: string
  author: string
  price: number
  discount_price: number
  cover_image: string
  average_rating: number
  created_at: string // شمسی مثل "1404/01/06"
}

export default function TheLatestBooks() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://683dbdd7199a0039e9e6b54e.mockapi.io/Products')
        const data = await res.json()

        // مرتب‌سازی بر اساس تاریخ شمسی
        const sorted = [...data]
          .filter((item: Product) => !!item.created_at)
          .sort((a: Product, b: Product) => {
            const dateA = moment(a.created_at, 'jYYYY/jMM/jDD')
            const dateB = moment(b.created_at, 'jYYYY/jMM/jDD')
            return dateB.valueOf() - dateA.valueOf()
          })
          .slice(0, 10)

        setProducts(sorted)
      } catch (err) {
        console.error('خطا در دریافت کتاب‌ها:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="text-center py-10 text-gray-500">در حال دریافت اطلاعات...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-right">📚 جدیدترین کتاب‌ها</h2>
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
          }}
          spaceBetween={16}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-10"
        >
          {products.map((product) => {
            const formattedDate = moment(product.created_at, 'jYYYY/jMM/jDD').format('jYYYY/jMM/jDD')

            return (
              <SwiperSlide key={product.id}>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-3 flex flex-col h-full">
                  <Link href={`/product/${product.id}`}>
                    <div className="w-full h-52 rounded-xl overflow-hidden mb-3 relative">
                      <Image
                        src={product.cover_image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="text-right flex-1">
                      <h3 className="text-base font-bold text-gray-800 line-clamp-1">{product.title}</h3>
                      <p className="text-sm text-gray-500 mb-1 line-clamp-1">{product.author}</p>
                      <div className="flex items-center text-xs text-gray-400 gap-1 mb-2">
                        <FaRegCalendarAlt className="text-gray-400" />
                        <span>تاریخ افزودن: {formattedDate}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <div className="text-green-600 font-semibold">
                          {product.discount_price.toLocaleString()} تومان
                          <div className="text-xs text-red-500 line-through">
                            {product.price.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <FaStar className="text-sm" />
                          {product.average_rating}/10
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-200">
                    <button className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 text-sm px-3 py-1.5 rounded-xl transition">
                      <FaShoppingCart />
                      افزودن
                    </button>
                    <button className="text-red-500 hover:text-red-600 text-lg">
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>

        <button className=" transform rotate-180 prev-btn absolute top-1/2 right-0 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full shadow p-2 hover:bg-gray-100 transition">
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className=" transform rotate-180 next-btn absolute top-1/2 left-0 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full shadow p-2 hover:bg-gray-100 transition">
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
