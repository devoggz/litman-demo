import HeroBannerItem from "./HeroBannerItem";
import HeroCarousel from "./HeroCarousel";

import { getHeroBanners, getHeroSliders } from "@/components/get-api-data/hero";

const Hero = async () => {
  const data = await getHeroBanners();
  const sliders = await getHeroSliders();

  return (
    <section className="overflow-hidden ">
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-8 pt-16 xl:px-0">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="w-full xl:col-span-2">
            <div className="relative overflow-hidden bg-white border z-1 border-gray-2 rounded-2xl h-full">
              <HeroCarousel sliders={sliders} />
            </div>
          </div>
          <div className="flex flex-col rounded-2xl w-full bg-gray gap-5 xl:col-span-1 sm:flex-row xl:flex-col">
            {data.map((bannerItem, key: number) => (
              <HeroBannerItem key={key} bannerItem={bannerItem} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
