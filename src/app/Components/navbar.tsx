// components/Header.tsx
'use client'

import Link from 'next/link'
import { ShoppingCart, User, Search, Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/app/Contexts/AuthContext';
import { useCart } from "@/app/Contexts/CartContext"

import { useRouter } from 'next/navigation';


export default function navbar() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const { login, user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  console.log(user)

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* لوگو */}
        <Link href="/" className="hidden md:block md:text-2xl md:font-bold md:text-gray-800">
          کتاب‌فروشی
        </Link>

        {/* دکمه منوی موبایل */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-gray-800" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800" />
          )}
        </button>

        {/* منوی دسکتاپ */}
        <nav className="hidden md:flex space-x-6 rtl:space-x-reverse">
          <Link href="/" className="text-gray-600 hover:text-black">خانه</Link>
          <Link href="/CategoriesPage" className="text-gray-600 hover:text-black">دسته‌بندی‌ها</Link>
          <Link href="/AboutPage" className="text-gray-600 hover:text-black">درباره ما</Link>
          <Link href="/ContactPage" className="text-gray-600 hover:text-black">تماس با ما</Link>
        </nav>

        {/* آیکون‌ها */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button>
            <Search className="w-5 h-5 text-gray-600 hover:text-black" />
          </button>
          {
            user===null?
            <button>
              <Link href={"/Login"}>
                  <User className="w-5 h-5 text-gray-600 hover:text-black" />
              </Link>
            </button>
            :
            <div className="relative">
            <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <User className="w-5 h-5 text-gray-600 hover:text-black" />
            </button>
            
            {userMenuOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                <Link href="/UserPanel" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  پیشخوان
                </Link>
                <Link href="/UserPanel/OrderUserPanel" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  سفارش ها
                </Link>
                <Link href="/UserPanel/Favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  دانلود ها
                </Link>
                <Link href="/UserPanel/Addresses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  آدرس
                </Link>
                <Link href="/UserPanel/BankCart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  علاقه مندی ها
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
                  <LogOut className="w-4 h-4 ml-2" />
                  خروج
                </button>
              </div>
            )}
          </div>
          }

         

          <Link href={"/CartPage"}>
            <button className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-black" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cart.length}</span>
            </button>
          </Link>
        </div>
        
      </div>
      

      {/* منوی موبایل */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
          <Link href="/" className="block text-gray-700 hover:text-black">خانه</Link>
          <Link href="/CategoriesPage" className="block text-gray-700 hover:text-black">دسته‌بندی‌ها</Link>
          <Link href="/AboutPage" className="block text-gray-700 hover:text-black">درباره ما</Link>
          <Link href="/ContactPage" className="block text-gray-700 hover:text-black">تماس با ما</Link>
        </div>
      )}
    </header>
  )
}
