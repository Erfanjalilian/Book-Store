import HandelSlug from "@/app/Components/HandelSlug/page"

type Props = {
  params: {
    slug: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function ProductPage({ params }: Props) {
  return (
    <div>
      <HandelSlug params={{ slug: params.slug }} />
    </div>
  )
}
