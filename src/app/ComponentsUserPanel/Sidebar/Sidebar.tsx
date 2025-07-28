'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaAddressBook,
  FaCreditCard,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useAuth } from '@/app/Contexts/AuthContext';
import { useRouter } from 'next/navigation';

function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
        لطفاً ابتدا وارد حساب کاربری شوید.
      </div>
    );
  }

  const navItems = [
    {
      href: '/UserPanel',
      icon: <FaUser className="h-5 w-5" />,
      label: 'اطلاعات شخصی',
    },
    {
      href: '/UserPanel/OrderUserPanel',
      icon: <FaShoppingBag className="h-5 w-5" />,
      label: 'سفارش‌های من',
    },
    {
      href: '/UserPanel/Favorites',
      icon: <FaHeart className="h-5 w-5" />,
      label: 'علاقه‌مندی‌ها',
    },
    {
      href: '/UserPanel/Addresses',
      icon: <FaAddressBook className="h-5 w-5" />,
      label: 'آدرس‌ها',
    },
    {
      href: '/UserPanel/BankCart',
      icon: <FaCreditCard className="h-5 w-5" />,
      label: 'کارت‌های بانکی',
    },
  ];

  return (
    <div className="md:col-span-1">
      <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <FaUser className="h-6 w-6 lg:h-8 lg:w-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-base lg:text-lg font-semibold text-gray-900">
              {user.name} {user.lastName}
            </h2>
            <p className="text-xs lg:text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <nav className="space-y-1 lg:space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 p-2 lg:p-3 rounded-lg text-sm lg:text-base ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}

          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="w-full flex items-center space-x-3 p-2 lg:p-3 rounded-lg text-red-600 hover:bg-red-50 text-sm lg:text-base"
          >
            <FaSignOutAlt className="h-5 w-5" />
            <span>خروج</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
