import Image from "next/image";
import Slider from "./Components/Slider/Slider"
import BestBestSellerCarousel from "./Components/BestSellingProducts/BestSellingProducts"
import TheLatestBooks from "./Components/TheLatestBooks/TheLatestBooks";
import MiddleBannerAd from "./Components/MiddleBannerAd/MiddleBannerAd";
import SpecialOffers from "./Components/SpecialOffers/SpecialOffers";
import Comments from "./Components/Comments/Comments";
import NewsletterSignup from "./Components/NewsletterSignup/NewsletterSignup";

export default function Home() {
  return (
    <div>

      <Slider />
      <BestBestSellerCarousel />
      <br />
      <TheLatestBooks />
      
      <MiddleBannerAd />
      <SpecialOffers/>
      <Comments />
      <NewsletterSignup/>


    </div>
  );
}
