import HandelSlug from "@/HandelSlug/page"

export default function ProductPage({ params }) {
  return (
    <div>
      <HandelSlug slug={params.slug} />
    </div>
  )
}

