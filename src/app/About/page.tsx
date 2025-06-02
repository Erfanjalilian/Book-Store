'use client';

import { motion } from 'framer-motion';
import { FaBook, FaUsers, FaShippingFast, FaHeadset } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl mb-16 shadow-2xl"
        >
          <h1 className="text-6xl font-extrabold text-white mb-6 drop-shadow-lg">درباره ما</h1>
          <p className="text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
            فروشگاه کتاب آنلاین ما، با افتخار در خدمت شماست
          </p>
        </motion.div>

        <div className="flex flex-col gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">داستان ما</h2>
            <p className="text-xl text-gray-600 leading-relaxed text-justify">
              فروشگاه کتاب ما با هدف ارائه بهترین خدمات به دوستداران کتاب در سال ۱۴۰۰ تأسیس شد.
              ما معتقدیم که کتاب‌ها می‌توانند زندگی را تغییر دهند و به همین دلیل، انتخاب و ارائه
              بهترین کتاب‌ها به مشتریانمان را سرلوحه کار خود قرار داده‌ایم.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-lg text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBook className="text-4xl text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">تنوع کتاب‌ها</h3>
              <p className="text-gray-600 leading-relaxed">بیش از ۱۰۰۰۰ عنوان کتاب در دسته‌بندی‌های مختلف</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-3xl shadow-lg text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="text-4xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">مشتری‌مداری</h3>
              <p className="text-gray-600 leading-relaxed">ارائه خدمات با کیفیت و پشتیبانی ۲۴ ساعته</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white p-8 rounded-3xl shadow-lg text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="bg-purple-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShippingFast className="text-4xl text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">ارسال سریع</h3>
              <p className="text-gray-600 leading-relaxed">ارسال به سراسر کشور در کمترین زمان ممکن</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white p-8 rounded-3xl shadow-lg text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeadset className="text-4xl text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">پشتیبانی</h3>
              <p className="text-gray-600 leading-relaxed">پاسخگویی به سؤالات و راهنمایی شما</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-16 rounded-3xl text-center shadow-2xl"
          >
            <h2 className="text-4xl font-bold text-white mb-8">چشم‌انداز ما</h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
              ما در تلاش هستیم تا با ارائه بهترین خدمات و محصولات، به بزرگترین مرجع خرید کتاب
              آنلاین در ایران تبدیل شویم. هدف ما این است که دسترسی به کتاب‌های با کیفیت را برای
              همه ایرانیان فراهم کنیم.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 