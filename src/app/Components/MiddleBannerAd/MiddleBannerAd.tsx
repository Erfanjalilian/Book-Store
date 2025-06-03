import Image from 'next/image';

interface BannerItem {
  title: string;
  description: string;
  cta_link: string;
  cta_text: string;
  image_url: string;
}

async function MiddleBannerAd(){
    const res=await fetch("https://683dc34a199a0039e9e6c8b6.mockapi.io/MiddleBannerAd")
    const data=await res.json()

  
   

  return (
    <div>
        {
            data.map((item: BannerItem)=>(
                <div key={item.title} className="relative w-full py-10 bg-gray-100">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-right w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h2>
          <p className="text-sm text-gray-600 mb-4">{item.description}</p>
          <a href={item.cta_link} className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            {item.cta_text}
          </a>
        </div>

        {/* نمایش تصویر بنر */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <Image
            src={item.image_url}
            alt={item.title}
            width={500}
            height={300}
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
            ))
        }
    </div>
    
  )
}

export default MiddleBannerAd
