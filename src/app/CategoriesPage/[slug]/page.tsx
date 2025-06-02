"use client"
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useCart } from '@/app/Contexts/CartContext'

type Product = {
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

type Props = {
  params: { slug: string }
}

export default function ProductPage({ params }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://683dbdd7199a0039e9e6b54e.mockapi.io/Products/${params.slug}`)
        if (!res.ok) {
          throw new Error('Product not found')
        }
        const data = await res.json()
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!product) {
    return notFound()
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    addToCart(
      {
        id: product.id,
        title: product.title,
        discount_price: product.discount_price,
        cover_image: product.cover_image,
        stock: product.stock,
      },
      quantity
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">

            <div className="relative w-full h-[500px] bg-gray-100 rounded-xl overflow-hidden group">
              <Image
                src={product.cover_image}
                alt={product.title}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-900 leading-tight">{product.title}</h1>
                <p className="text-xl text-gray-700">نویسنده: <span className="font-semibold">{product.author}</span></p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-green-600">
                      {product.discount_price.toLocaleString()} تومان
                    </span>
                    <span className="text-lg line-through text-gray-400">
                      {product.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {Math.round(((product.price - product.discount_price) / product.price) * 100)}% تخفیف
                  </div>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <span className="text-2xl">⭐</span>
                  <span className="text-gray-700 font-semibold">{product.average_rating}</span>
                  <span className="text-gray-500">({product.reviews_count} نظر)</span>
                </div>
              </div>

              <div className="prose prose-lg text-gray-700 leading-relaxed">
                <p>{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-lg">
                <div className="space-y-3">
                  <p className="flex items-center gap-2 text-gray-700">
                    <span className="font-semibold text-gray-900">ناشر:</span>
                    <span>{product.publisher}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <span className="font-semibold text-gray-900">تاریخ چاپ:</span>
                    <span>{product.publication_date}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <span className="font-semibold text-gray-900">زبان:</span>
                    <span>{product.language}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <span className="font-semibold text-gray-900">تعداد صفحات:</span>
                    <span>{product.pages}</span>
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="flex items-center gap-2 text-gray-700">
                    <span className="font-semibold text-gray-900">دسته‌بندی:</span>
                    <span>{product.categories}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <span className="font-semibold text-gray-900">موجودی:</span>
                    <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                      {product.stock > 0 ? `${product.stock} عدد در انبار` : "ناموجود"}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <span className="font-semibold text-gray-900">تعداد فروش:</span>
                    <span>{product.sold_count} عدد</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 font-semibold">تعداد:</span>
                <div className="flex items-center gap-2">
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={product.stock === 0 || quantity <= 1}
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    max={product.stock}
                    className="w-16 h-10 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    disabled={product.stock === 0}
                  />
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={product.stock === 0 || quantity >= product.stock}
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  حداکثر {product.stock} عدد
                </span>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-semibold">قیمت کل:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {(quantity * product.discount_price).toLocaleString()} تومان
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? "افزودن به سبد خرید" : "ناموجود"}
                </button>
                <button
                  className="w-full py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-bold text-lg"
                >
                  افزودن به علاقه‌مندی‌ها
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
