
import Slider from "./Components/Slider/Slider"
import BestBestSellerCarousel from "./Components/BestSellingProducts/BestSellingProducts"
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
      
      <MiddleBannerAd />
      <SpecialOffers/>
      <Comments />
      <NewsletterSignup/>


    </div>
  );
}
