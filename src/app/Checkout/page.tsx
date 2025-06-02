"use client"
import React, { use } from 'react';
import { useCart } from "@/app/Contexts/CartContext"
import { useAuth } from '@/app/Contexts/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
type data={
    "id": string,
    "userId": string,
    "fullName": string,
    "mobile": string,
    "province": string,
    "city": string,
    "postalCode": string,
    "addressLine": string,
    "isDefault": boolean
}
const Checkout = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
    const {user}=useAuth()
    const [data, setData] = useState<data[]>();         // داده دریافتی
   
    useEffect(() => {
        const fetchData = async () => {
          if (!user) return;
          try {
            const res = await fetch(`https://683dc5b3199a0039e9e6d25e.mockapi.io/addresses?userId=${user.id}`);
            if (!res.ok) throw new Error('مشکلی در دریافت داده رخ داد');
            const result = await res.json();
            setData(result);
          } catch (err) {
            console.error(err);
          }
        };
      
        fetchData();
      }, [user]); // ✅ فقط یک بار اجرا می‌شود
       // dependency array: [] یعنی فقط یک‌بار اجرا هنگام لود شدن کامپوننت
    
      
    

   
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.discount_price * item.quantity,
        0
      )
    

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">نهایی‌سازی خرید</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* فرم اطلاعات کاربر */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">اطلاعات مشتری</h2>
            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
                <input
                  type="text"
                  value={`${user?.name ?? ''} ${user?.lastName ?? ''}`}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">ایمیل</label>
                <input
                  type="email"
                  value={user?.email}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">شماره تماس</label>
                <input
                  type="tel"
                  value={user?.phone}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">آدرس کامل</label>
                <textarea
                  rows={3}
                  value={data?.find(addr => addr.isDefault)?.addressLine ?? ''}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition duration-200 font-medium text-lg shadow-md hover:shadow-lg"
              >
                ثبت سفارش
              </button>
            </form>
          </div>

          {/* خلاصه سبد خرید */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">سبد خرید شما</h2>
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-4 border-b border-gray-100">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">تعداد: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-gray-900">{item.discount_price.toLocaleString()} تومان</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700">جمع کل:</span>
                <span className="text-2xl font-bold text-gray-900">{totalPrice.toLocaleString()} تومان</span>
              </div>
              <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
                هزینه ارسال هنگام تماس با شما هماهنگ می‌شود.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
