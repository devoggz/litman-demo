import LargePromoBanner from "./LargePromoBanner";
import SmallPromoBanner from "./SmallPromoBanner";

const PromoBanner = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-8 xl:px-0">
        <LargePromoBanner
          buttonText="Find Out More"
          description="iPhone 14 has the same superspeedy chip that's in iPhone 13 Pro, A15 Bionic, with a 5‑core GPU, powers all the latest features."
          imageUrl="/images/promo/promo-01.png"
          link="iphone-14-plus--6128gb"
          subtitle="Apple iPhone 14 Plus"
          title="Chukua, Lipa Polepole!"
        />
        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
          <SmallPromoBanner
            buttonText="Grab the deal"
            discount="Flat 20% off"
            imageUrl="/images/promo/promo-05.png"
            link="smart-blender"
            subtitle="oraimo SmartBlender "
            title="Cup 1L Juice Blender"
          />

          <SmallPromoBanner
            buttonText="Grab the deal"
            description="More than 28-Day Standby, 7-Day Usage Time Extended Power, Uninterrupted Use"
            imageUrl="/images/promo/promo-04.png"
            link="/products/apple-watch-ultra"
            subtitle="Watch 5 Lite"
            title="Up to 40% off"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
