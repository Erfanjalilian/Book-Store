"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/Contexts/AuthContext";

interface AddAddressModalProps {
  onClose: () => void;
  onSuccess: () => void;
  editData?: Address | null;
}

interface Address {
  id?: number;
  userId?: number;
  fullName: string;
  mobile: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
  isDefault: boolean;
}

export default function AddAddressModal({ onClose, onSuccess, editData }: AddAddressModalProps) {
  const { user } = useAuth();

  const [form, setForm] = useState<Address>({
    fullName: "",
    mobile: "",
    province: "",
    city: "",
    postalCode: "",
    addressLine: "",
    isDefault: false,
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const payload = {
      ...form,
      userId: user.id,
    };

    const url = editData
      ? `https://683dc5b3199a0039e9e6d25e.mockapi.io/addresses/${editData.id}`
      : "https://683dc5b3199a0039e9e6d25e.mockapi.io/addresses";

    const method = editData ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">
            {editData ? "ویرایش آدرس" : "افزودن آدرس جدید"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-4">
            <input
              name="fullName"
              placeholder="نام و نام خانوادگی"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={handleChange}
              value={form.fullName}
              required
            />
            <input
              name="mobile"
              placeholder="موبایل"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={handleChange}
              value={form.mobile}
              required
            />
            <input
              name="province"
              placeholder="استان"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={handleChange}
              value={form.province}
              required
            />
            <input
              name="city"
              placeholder="شهر"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={handleChange}
              value={form.city}
              required
            />
            <input
              name="postalCode"
              placeholder="کدپستی"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={handleChange}
              value={form.postalCode}
              required
            />
            <input
              name="addressLine"
              placeholder="آدرس کامل"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={handleChange}
              value={form.addressLine}
              required
            />
            <label className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">
              <input
                type="checkbox"
                name="isDefault"
                onChange={handleChange}
                checked={form.isDefault}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm">آدرس پیش‌فرض باشد</span>
            </label>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
            >
              {editData ? "ذخیره تغییرات" : "ذخیره"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
