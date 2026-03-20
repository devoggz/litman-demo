import Link from "next/link";
import Image from "next/image";

import { formatPrice } from "@/utils/formatePrice";
import { IHeroBanner } from "@/types/hero";

export default function HeroBannerItem({
  bannerItem,
}: {
  bannerItem: IHeroBanner;
}) {
  return (
    <div
      className="relative w-full flex-1 px-6 bg-dark-6 border rounded-2xl border-gray-2"
      style={{
        backgroundBlendMode: "soft-light",
        backgroundImage: `url('/images/hero/pattern.svg')`,
        backgroundSize: "auto",
      }}
    >
      <div className="flex items-center justify-between gap-5 h-full py-6">
        <div className="w-1/2 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="max-w-[153px] font-semibold text-green-bright text-xl hover:text-meta-4 mb-2">
              <Link href={`/products/${bannerItem?.product?.slug}`}>
                {bannerItem.bannerName}
              </Link>
            </h2>
            <p className="text-sm text-meta-4">{bannerItem?.subtitle}</p>
          </div>
          <div>
            <p className="font-medium text-meta-3 text-xs mb-1.5 uppercase">
              limited time offer
            </p>
            <span className="flex items-center gap-2.5">
              <span className="font-bold text-md text-meta-5">
                {formatPrice(
                  bannerItem?.product?.discountedPrice
                    ? bannerItem?.product?.discountedPrice
                    : bannerItem?.product?.price,
                )}
              </span>
              {bannerItem?.product?.discountedPrice && (
                <span className="text-sm font-medium line-through text-meta-4">
                  {formatPrice(bannerItem?.product?.price)}
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <Image
            alt={bannerItem?.product?.title || "Banner image"}
            height={210}
            src={bannerItem?.bannerImage}
            width={170}
          />
        </div>
      </div>
    </div>
  );
}
