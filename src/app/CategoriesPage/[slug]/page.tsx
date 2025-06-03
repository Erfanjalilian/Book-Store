
import HandelSlug from "@/HandelSlug/page"

type PageProps = {
  params: {
    slug: string;
  };
};

export default function ProductPage({ params }: PageProps) {
  return (
    <div>
      <HandelSlug slug={params.slug} />
    </div>
  )
}
