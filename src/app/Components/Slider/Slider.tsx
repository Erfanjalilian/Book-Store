'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import Link from 'next/link'

interface Slide {
  id: number
  image_url: string
  title: string
  subtitle: string
  link: string
}

export default function Slider() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch('https://683dbdd7199a0039e9e6b54e.mockapi.io/Advertising')
        const data = await res.json()
        setSlides(data)
      } catch (error) {
        console.error('خطا در دریافت اسلایدها:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSlides()
  }, [])

  if (loading) {
    return <div className="text-center py-10 text-gray-500">در حال بارگذاری اسلایدها...</div>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="rounded-2xl overflow-hidden shadow-xl relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          slidesPerView={1}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="fade"
          className="w-full"
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id}>
              <Link href={slide.link} className="block relative group">
                <img
                  src={slide.image_url}
                  alt={slide.title}
                  className="w-full h-[250px] md:h-[400px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start p-6 md:p-10 text-white">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-base md:text-lg">{slide.subtitle}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
