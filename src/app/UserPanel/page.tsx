"use client";
import React from 'react';
import { useAuth } from '@/app/Contexts/AuthContext';
import Sidebar from "@/app/ComponentsUserPanel/Sidebar/Sidebar"
import {FaBell, FaCog } from 'react-icons/fa';

const UserPanel = () => {
  const { user} = useAuth();
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
        لطفاً ابتدا وارد حساب کاربری شوید.
      </div>
    );
  }

  

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

          <Sidebar/>
       
               
          

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
                    value={user.name}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نام خانوادگی</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={user.lastName}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={user.email}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">شماره موبایل</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={user.phone}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* سفارش‌ها به شکل قبل باقی می‌ماند */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
