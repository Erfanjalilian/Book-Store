
import HandelSlug from "@/HandelSlug/page"

type PageProps = {
  params: {
    slug: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function ProductPage({ params }: PageProps) {
  return (
    <div>
      <HandelSlug slug={params.slug} />
    </div>
  )
}
