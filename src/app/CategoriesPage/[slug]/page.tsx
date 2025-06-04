import HandelSlug from "@/HandelSlug/page"

type PageProps = {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: PageProps) {
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

    const products: { id: string }[] = await res.json()

    return products.map((product) => ({
      slug: product.id,
    }))
  } catch (error) {
    console.error("Error in generateStaticParams:", error)
    return [] // یا می‌تونی مقادیر تستی بذاری
  }
}
