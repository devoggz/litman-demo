import React from "react";
import Image from "next/image";

const featureData = [
  {
    img: "/images/ear01.png",
    title: "Free Delivery ",
    description: "For all orders Kes 2,000",
  },
  {
    img: "/images/ear02.png",
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
  },
  {
    img: "/images/ear03.png",
    title: "100% Secure Payments",
    description: "Gurantee secure payments",
  },
  {
    img: "/images/ear01.png",
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
];

const FooterFeature = () => {
  return (
    <section className="pb-[60px]">
      <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0 ">
        <div className="flex flex-wrap items-center gap-7.5 xl:gap-12.5">
          {featureData.map((item, key) => (
            <div key={key} className="flex items-center gap-4">
              <Image alt="icons" height={41} src={item.img} width={40} />

              <div>
                <h3 className="text-lg font-semibold text-dark">
                  {item.title}
                </h3>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FooterFeature;
