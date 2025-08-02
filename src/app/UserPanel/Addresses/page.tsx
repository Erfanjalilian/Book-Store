"use client";
import { useEffect, useState, useCallback } from "react";
import AddAddressModal from "@/app/Components/AddAddressModal/AddAddressModal";
import { useAuth } from "@/app/Contexts/AuthContext";
import Sidebar from "@/app/ComponentsUserPanel/Sidebar/Sidebar";

interface Address {
  id: number;
  userId: number;
  fullName: string;
  mobile: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
  isDefault: boolean;
}

export default function AddressPage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Address | null>(null);

  const fetchAddresses = useCallback(async () => {
    if (!user || !user.id) {
      setAddresses([]);
      return;
    }
    
      const res = await fetch(
        `https://683dc5b3199a0039e9e6d25e.mockapi.io/addresses?userId=${user.id}`
      );
      if (!res.ok) {
        setAddresses([]);
        return;
      }
      const data = await res.json();
      setAddresses(Array.isArray(data) ? data : []);
  
     
  }, [user]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleDelete = async (id: number) => {
    await fetch(`https://683dc5b3199a0039e9e6d25e.mockapi.io/addresses/${id}`, {
      method: "DELETE",
    });
    fetchAddresses();
  };

  const handleEdit = (address: Address) => {
    setEditData(address);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => {
            const mobileSidebar = document.getElementById("mobile-sidebar");
            if (mobileSidebar) {
              mobileSidebar.classList.toggle("translate-x-full");
            }
          }}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transform translate-x-full transition-transform duration-300"
      >
        <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg">
          <div className="p-4">
            <button
              onClick={() => {
                const mobileSidebar = document.getElementById("mobile-sidebar");
                if (mobileSidebar) {
                  mobileSidebar.classList.add("translate-x-full");
                }
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">آدرس‌های من</h1>
          <button
            onClick={() => {
              setEditData(null);
              setShowModal(true);
            }}
            className="w-full lg:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            افزودن آدرس جدید
          </button>
        </div>

        {(!user || addresses.length === 0) ? (
          <p className="text-gray-500">شما هنوز هیچ آدرسی ثبت نکرده‌اید.</p>
        ) : (
          <div className="grid gap-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <p className="font-semibold">{address.fullName}</p>
                <p>{address.mobile}</p>
                <p>
                  {address.province}، {address.city}
                </p>
                <p>{address.addressLine}</p>
                <p>کد پستی: {address.postalCode}</p>
                {address.isDefault && (
                  <span className="inline-block mt-2 text-sm text-green-600 font-medium">
                    آدرس پیش‌فرض
                  </span>
                )}
                <div className="flex flex-col lg:flex-row gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(address)}
                    className="w-full lg:w-auto px-4 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-sm"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="w-full lg:w-auto px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <AddAddressModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchAddresses}
          editData={editData}
        />
      )}
    </div>
  );
}
