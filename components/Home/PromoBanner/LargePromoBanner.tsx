import Image from "next/image";
import Link from "next/link";

interface LargePromoBannerProps {
  imageUrl: string;
  subtitle: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

export default function LargePromoBanner({
  imageUrl,
  subtitle,
  title,
  description,
  link,
  buttonText,
}: LargePromoBannerProps) {
  return (
    <div
      className="relative hidden lg:block  z-1 overflow-hidden rounded-2xl bg-dark-6 py-12.5 lg:py-17.5 xl:py-22.5 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-7.5"
      style={{
        backgroundBlendMode: "soft-light",
        backgroundImage: `url('/images/hero/pattern.svg')`,
        backgroundSize: "auto",
      }}
    >
      <div className="max-w-[550px] w-full">
        <span className="block mb-3 text-xl font-medium text-meta-4">
          {subtitle}
        </span>
        <h2 className="mb-5 text-xl font-semibold lg:text-heading-4 xl:text-heading-3 text-green-bright">
          {title}
        </h2>
        <p className="text-meta-4">{description}</p>
        <Link
          className="inline-flex font-medium text-custom-sm text-white bg-green-bright py-3 px-7 rounded-lg  ease-out duration-200 hover:bg-green-bright/80 mt-7.5"
          href={`/products/${link}`}
        >
          {buttonText}
        </Link>
      </div>
      <Image
        alt="promo img"
        className="absolute bottom-0 right-4 lg:right-26 -z-1"
        height={369}
        src={imageUrl}
        width={420}
      />
    </div>
  );
}
