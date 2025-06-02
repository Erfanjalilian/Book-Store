import React from 'react';
import { FaUser, FaShoppingBag, FaHeart, FaAddressBook, FaCreditCard, FaSignOutAlt, FaBell, FaCog } from 'react-icons/fa';

const UserPanel = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">پنل کاربری</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <FaBell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <FaCog className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FaUser className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">علی محمدی</h2>
                  <p className="text-sm text-gray-500">ali@example.com</p>
                </div>
              </div>
              <nav className="space-y-2">
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-50 text-indigo-600">
                  <FaUser className="h-5 w-5" />
                  <span>اطلاعات شخصی</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50">
                  <FaShoppingBag className="h-5 w-5" />
                  <span>سفارش‌های من</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50">
                  <FaHeart className="h-5 w-5" />
                  <span>علاقه‌مندی‌ها</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50">
                  <FaAddressBook className="h-5 w-5" />
                  <span>آدرس‌ها</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50">
                  <FaCreditCard className="h-5 w-5" />
                  <span>کارت‌های بانکی</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50">
                  <FaSignOutAlt className="h-5 w-5" />
                  <span>خروج</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">اطلاعات شخصی</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نام</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value="علی"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نام خانوادگی</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value="محمدی"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value="ali@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">شماره موبایل</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value="09123456789"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out">
                  ذخیره تغییرات
                </button>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">سفارش‌های اخیر</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">شماره سفارش</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مبلغ</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#12345</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1402/12/15</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          تحویل شده
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1,250,000 تومان</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#12344</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1402/12/10</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          در حال ارسال
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">850,000 تومان</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel; 