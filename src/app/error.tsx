"use client"
import React from "react";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full flex flex-col items-center border border-red-200 animate-fade-in">
        <svg className="w-20 h-20 text-red-500 mb-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 18c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h1 className="text-3xl font-bold text-red-600 mb-2">این قسمت هنوز درست نشده است</h1>
        <p className="text-gray-700 text-center mb-4">متاسفانه این بخش هنوز کدنویسی نشده یا در حال توسعه است.<br />لطفا بعدا مراجعه نمایید یا به پشتیبانی اطلاع دهید.</p>
        <div className="bg-red-50 text-red-500 rounded-lg px-4 py-2 text-sm mb-4 w-full text-center break-words">
          {error?.message}
        </div>
        <button
      
          onClick={reset}
          className="mt-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          تلاش مجدد
        </button>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
