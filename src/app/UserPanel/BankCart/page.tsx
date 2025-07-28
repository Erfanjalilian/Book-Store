"use client";
import { useAuth } from '@/app/Contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import AddABankCard from "@/app/ComponentsUserPanel/AddABankCard/AddABankCard";
import Sidebar from '@/app/ComponentsUserPanel/Sidebar/Sidebar';

type BankCard = {
  id: number;
  userId: number;
  cardNumber: string;
  holderName: string;
  expirationDate: string;
};

function BankCart() {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<BankCard | null>(null);
  const { user } = useAuth();
  const [cards, setCards] = useState<BankCard[]>([]);

  const fetchBankCart = useCallback(async () => {
    if (!user || !user.id) {
      setCards([]);
      return;
    }
    try {
      const res = await fetch(`https://683dc6f7199a0039e9e6d7ab.mockapi.io/bankCards?userId=${user.id}`);
      if (!res.ok) {
        setCards([]);
        return;
      }
      const data = await res.json();
      setCards(Array.isArray(data) ? data : []);
    } catch (err) {
      setCards([]);
    }
  }, [user]);

  useEffect(() => {
    fetchBankCart();
  }, [fetchBankCart]);

  const handleDelete = async (id: number) => {
    await fetch(`https://683dc6f7199a0039e9e6d7ab.mockapi.io/bankCards/${id}`, {
      method: "DELETE",
    });
    fetchBankCart();
  };

  const handleEdit = (card: BankCard) => {
    setEditData(card);
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-64 p-4 bg-white border-r shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">کارت‌های بانکی من</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              onClick={() => {
                setEditData(null);
                setShowModal(true);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              افزودن کارت جدید
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              cards.length === 0 ? (
                <p className='text-gray-500'>هیچ کارت بانکی ثبت نشده است.</p>
              ) : (
                cards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div className="text-sm opacity-80">کارت اعتباری</div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm opacity-80 mb-1">نام دارنده</p>
                        <h2 className="text-xl font-semibold">{card.holderName}</h2>
                      </div>

                      <div>
                        <p className="text-sm opacity-80 mb-1">شماره کارت</p>
                        <p className="text-xl tracking-widest font-mono">
                          {card.cardNumber.match(/.{1,4}/g)?.join(' ')}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm opacity-80 mb-1">تاریخ انقضا</p>
                        <p className="text-lg">{card.expirationDate}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-200"
                        onClick={() => handleEdit(card)}
                      >
                        ویرایش
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500/20 text-white rounded-lg hover:bg-red-500/30 transition-colors duration-200"
                        onClick={() => handleDelete(card.id)}
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))
              )
            }
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddABankCard
          onClose={() => setShowModal(false)}
          onSuccess={fetchBankCart}
          editData={editData}
        />
      )}
    </div>
  );
}

export default BankCart;
