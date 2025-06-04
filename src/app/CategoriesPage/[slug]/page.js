import HandelSlug from "@/HandelSlug/page"



export default function ProductPage({ params }) {
  return (
    <div>
      <HandelSlug slug={params.slug} />
    </div>
  )
}

// ✅ اضافه کردن generateStaticParams برای جلوگیری از ارور Netlify و TypeScript
export async function generateStaticParams() {
  try {
    const res = await fetch("https://683dbdd7199a0039e9e6b54e.mockapi.io/Products")

    if (!res.ok) {
      throw new Error("Failed to fetch products")
    }

    const products= await res.json()

    return products.map((product) => ({
      slug: product.id,
    }))
  } catch (error) {
    console.error("Error in generateStaticParams:", error)
    return [] // یا می‌تونی مقادیر تستی بذاری
  }
}
