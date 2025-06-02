"use client"

import { useCart } from "@/app/Contexts/CartContext"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { useAuth } from '@/app/Contexts/AuthContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const { login, user, logout } = useAuth();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.discount_price * item.quantity,
    0
  )

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 p-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-700">سبد خرید شما خالی است</h2>
        <p className="text-gray-500 text-center max-w-md">
          می‌توانید برای مشاهده محصولات بیشتر به صفحه اصلی فروشگاه مراجعه کنید
        </p>
        <Link href="/">
          <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            بازگشت به فروشگاه
          </button>
        </Link>
      </div>
    )
  }

  function myAlert(){
    window.location.href = "/Login";

    alert("ابتدا در سایت لاگین کنید ")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
          {/* هدر سبد خرید */}
          <div className="border-b border-gray-200 bg-white p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                سبد خرید شما
              </h1>
              <span className="text-xs sm:text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                {cart.length} کالا
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-8 p-3 sm:p-6">
            {/* لیست محصولات */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative w-full sm:w-24 h-40 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.cover_image}
                      alt={item.title}
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0 w-full space-y-2">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      قیمت واحد: {item.discount_price.toLocaleString()} تومان
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                        }
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        max={item.stock}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-10 sm:w-12 h-7 sm:h-8 text-center border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 bg-white"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.min(item.quantity + 1, item.stock))
                        }
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[120px]">
                      <div className="text-base sm:text-lg font-bold text-gray-900">
                        {(item.quantity * item.discount_price).toLocaleString()} تومان
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 rounded-lg hover:bg-red-50"
                      title="حذف از سبد خرید"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* خلاصه سفارش */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6 space-y-4 sm:space-y-6 lg:sticky lg:top-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">خلاصه سفارش</h2>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center text-sm sm:text-base text-gray-600">
                    <span>تعداد کالا:</span>
                    <span className="bg-gray-50 px-3 py-1 rounded-full">{cart.length} عدد</span>
                  </div>
                  <div className="flex justify-between items-center text-sm sm:text-base text-gray-600">
                    <span>جمع کل:</span>
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                      {totalPrice.toLocaleString()} تومان
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  {
                    user===null?
                    <div>
                      <button onClick={myAlert} className="w-full py-3 sm:py-4 bg-blue-600 text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
                        ادامه فرآیند خرید
                      </button>
                    </div>
                    :
                    <Link href="/Checkout">
                      <button className="w-full py-3 sm:py-4 bg-blue-600 text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
                        ادامه فرآیند خرید
                      </button>
                    </Link>
                  }
                </div>

                <button
                  onClick={clearCart}
                  className="w-full py-2 sm:py-3 text-gray-500 hover:text-red-500 transition-colors text-xs sm:text-sm font-medium bg-gray-50 hover:bg-red-50 rounded-lg"
                >
                  پاک کردن سبد خرید
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
