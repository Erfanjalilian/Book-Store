'use client'

import Link from 'next/link'
import { FaInstagram, FaTelegramPlane, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16 pt-10 pb-6 text-sm text-gray-700">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">کتاب‌فروشی من</h2>
          <p className="text-gray-600 text-sm">
            بهترین کتاب‌ها را با تخفیف ویژه و ارسال سریع از فروشگاه ما تهیه کنید.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">لینک‌های مفید</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-blue-600">درباره ما</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600">تماس با ما</Link></li>
            <li><Link href="/faq" className="hover:text-blue-600">سوالات متداول</Link></li>
            <li><Link href="/terms" className="hover:text-blue-600">قوانین و مقررات</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">دسته‌بندی‌ها</h3>
          <ul className="space-y-2">
            <li><Link href="/category/novel" className="hover:text-blue-600">رمان</Link></li>
            <li><Link href="/category/psychology" className="hover:text-blue-600">روانشناسی</Link></li>
            <li><Link href="/category/kids" className="hover:text-blue-600">کودک و نوجوان</Link></li>
            <li><Link href="/category/history" className="hover:text-blue-600">تاریخی</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">ما را دنبال کنید</h3>
          <div className="flex items-center gap-4 text-xl text-gray-600">
            <a href="#" className="hover:text-blue-600"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-600"><FaTelegramPlane /></a>
            <a href="#" className="hover:text-blue-600"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-600"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-500 text-xs border-t border-gray-200 pt-4">
        © {new Date().getFullYear()} سایت توسط عرفان جلیلیان طراحی شده است
      </div>
    </footer>
  )
}
