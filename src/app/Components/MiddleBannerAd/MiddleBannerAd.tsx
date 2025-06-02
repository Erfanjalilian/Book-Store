

async function MiddleBannerAd(){
    const res=await fetch("http://localhost:3000/MiddleBannerAd")
    const data=await res.json()

  
   

  return (
    <div>
        {
            data.map((item:any)=>(
                <div className="relative w-full py-10 bg-gray-100">
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
          <img
            src={item.image_url}
            alt={item.title}
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
