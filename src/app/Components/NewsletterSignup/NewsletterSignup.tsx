'use client'

export default function NewsletterSignup() {
  return (
    <div className="bg-blue-50 py-10 px-4 sm:px-6 lg:px-8 rounded-2xl shadow-md text-center max-w-4xl mx-auto my-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        📬 عضویت در خبرنامه
      </h2>
      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        اولین نفری باشید که از تخفیف‌ها، کتاب‌های جدید و پیشنهادهای ویژه مطلع می‌شود!
      </p>
      <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="ایمیل شما..."
          className="w-full sm:w-auto flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          عضویت
        </button>
      </form>
    </div>
  )
}
