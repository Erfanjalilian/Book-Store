"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/Contexts/AuthContext';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [identifier, setIdentifier] = useState(''); // ایمیل یا شماره
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isPhone = /^[0-9]{10,15}$/.test(identifier) || identifier.startsWith("09");
    const field = isPhone ? 'phone' : 'email';

    try {
      const res = await fetch(`http://localhost:3000/users?${field}=${identifier}&password=${password}`);
      const data = await res.json();

      if (data.length === 1) {
        login(data[0]);
        router.push('/UserPanel');
      } else {
        setError('ایمیل/شماره یا رمز عبور اشتباه است.');
      }
    } catch (err) {
      setError('خطا در اتصال به سرور.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            ورود به حساب کاربری
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            یا{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              ثبت نام کنید
            </a>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="identifier" className="sr-only">
                ایمیل یا شماره موبایل
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
                  placeholder="ایمیل یا شماره موبایل"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                رمز عبور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
                  placeholder="رمز عبور"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900">
                مرا به خاطر بسپار
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                رمز عبور را فراموش کرده‌اید؟
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              ورود
            </button>
          </div>
        </form>

        {/* Social login buttons (بدون تغییر) */}
      </div>
    </div>
  );
};

export default LoginPage;
