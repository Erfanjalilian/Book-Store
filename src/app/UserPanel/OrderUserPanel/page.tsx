"use client"
import { useState,useEffect } from "react";
import {useAuth} from "@/app/Contexts/AuthContext"
import Sidebar from "@/app/ComponentsUserPanel/Sidebar/Sidebar"



type Product = {
  productId: number;
  title: string;
  quantity: number;
  price: number;
};
type Order = {
  id: number;         // چون در API مقدارش string هست، اما منطقی‌تره number باشه
  userId: number;
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;  // ISO date string
};



function OrderUserPanel() {
  const { user, logout } = useAuth();
  const [data, setData] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true); // 👈 برای کنترل وضعیت لود
  const myId = user?.id;

  useEffect(() => {
    if (!myId) return;

    setLoading(true);
    fetch(`http://localhost:3000/orders/${myId}`)
      .then(res => res.json())
      .then(orderData => {
        setData(orderData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching order data:", error);
        setLoading(false);
      });
  }, [myId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-8">
              <Sidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {loading ? (
                <p className="text-gray-600">در حال دریافت اطلاعات...</p>
              ) : !data || data.products.length === 0 ? (
                <p className="text-gray-600">هیچ سفارشی ثبت نشده است.</p>
              ) : (
                <>
                  {/* نمایش جزئیات سفارش */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">سفارش شماره {data.id}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">وضعیت سفارش</p>
                        <p className="font-semibold text-gray-800">{data.status}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">تاریخ سفارش</p>
                        <p className="font-semibold text-gray-800">{new Date(data.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">قیمت کل</p>
                        <p className="font-semibold text-gray-800">{data.totalPrice.toLocaleString()} تومان</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">محصولات سفارش</h3>
                    <div className="space-y-4">
                      {data.products.map((product) => (
                        <div key={product.productId} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">عنوان</p>
                              <p className="font-semibold text-gray-800">{product.title}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">تعداد</p>
                              <p className="font-semibold text-gray-800">{product.quantity}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">قیمت واحد</p>
                              <p className="font-semibold text-gray-800">{product.price.toLocaleString()} تومان</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <button 
                onClick={logout}
                className="w-full md:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors mt-6"
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderUserPanel;
