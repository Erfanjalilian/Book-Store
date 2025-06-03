'use client';

import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl mb-16 shadow-2xl"
        >
          <h1 className="text-6xl font-extrabold text-white mb-6 drop-shadow-lg">تماس با ما</h1>
          <p className="text-2xl text-green-50 max-w-3xl mx-auto leading-relaxed">
            ما همیشه آماده پاسخگویی به سؤالات و پیشنهادات شما هستیم
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">اطلاعات تماس</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center">
                    <FaPhone className="text-2xl text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">تلفن تماس</h3>
                    <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">ایمیل</h3>
                    <p className="text-gray-600">info@bookstore.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-2xl text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">آدرس</h3>
                    <p className="text-gray-600">تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center">
                    <FaClock className="text-2xl text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">ساعات کاری</h3>
                    <p className="text-gray-600">شنبه تا پنجشنبه: ۹ صبح تا ۹ شب</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 rounded-3xl text-center shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-4">ساعات پاسخگویی</h2>
              <p className="text-white/90">
                تیم پشتیبانی ما در تمام ساعات کاری آماده پاسخگویی به سؤالات شما هستند.
                برای دریافت پاسخ سریع‌تر، می‌توانید از طریق فرم تماس با ما پیام خود را ارسال کنید.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">فرم تماس</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  ایمیل
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  موضوع
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  پیام
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                ارسال پیام
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;