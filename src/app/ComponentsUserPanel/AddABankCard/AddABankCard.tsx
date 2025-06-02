"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/Contexts/AuthContext";


interface bankCardsModalProps {
  onClose: () => void;
  onSuccess: () => void;
  editData?: bankCards | null;
}

interface bankCards {
      "id"?: number,
      "userId"?: number,
      "cardNumber": string,
      "holderName": string,
      "expirationDate": string
   
}

export default function AddAddABankCard({ onClose, onSuccess, editData }: bankCardsModalProps) {
  const { user } = useAuth();

  const [form, setForm] = useState<bankCards>({
 
    cardNumber: "",
    holderName: "",
    expirationDate: ""
    
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
      ? `http://localhost:3000/bankCards/${editData.id}`
      : "http://localhost:3000/bankCards";
      

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
            {editData ? "ویرایش کارت" : "افزودن کارت جدید"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-4">
            <input
              name="holderName"
              placeholder="نام دارنده کارت"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={handleChange}
              value={form.holderName}
              required
            />
            <input
              name="cardNumber"
              placeholder="شماره کارت"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={handleChange}
              value={form.cardNumber}
              required
            />
            <input
              name="expirationDate"
              placeholder="تاریخ انقضا"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={handleChange}
              value={form.expirationDate}
              required
            />
          
          
          
         
             
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
