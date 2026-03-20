import Image from "next/image";
import Link from "next/link";

interface SmallPromoBannerProps {
  imageUrl: string;
  subtitle: string;
  title: string;
  discount?: string;
  link: string;
  buttonText: string;
  rightAlign?: boolean;

  buttonColor?: string;
  description?: string;
}

export default function SmallPromoBanner({
  imageUrl,
  subtitle,
  title,
  discount,
  link,
  buttonText,
  rightAlign = false,
  description,
}: SmallPromoBannerProps) {
  return (
    <div
      className={`relative z-1 overflow-hidden rounded-2xl bg-dark-6 py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10`}
      style={{
        backgroundBlendMode: "soft-light",
        backgroundImage: `url('/images/hero/pattern.svg')`,
        backgroundSize: "auto",
      }}
    >
      <div className={`${rightAlign ? "text-right" : ""}`}>
        <span className="block text-lg text-meta-4 mb-1.5">{subtitle}</span>
        <h2 className="font-bold text-xl lg:text-heading-4 text-green-bright mb-2.5">
          {title}
        </h2>
        {description ? (
          <p
            className={`max-w-[285px] text-meta-4 text-custom-sm mb-2.5 ${
              rightAlign ? "ml-auto" : ""
            }`}
          >
            {description}
          </p>
        ) : (
          <p className="text-lg font-medium text-green-bright">{discount}</p>
        )}
        <Link
          className={`inline-flex font-medium text-custom-sm text-white bg-green-bright hover:bg-green-bright/80 py-3 px-7 rounded-lg ease-out duration-200 mt-7.5`}
          href={link}
        >
          {buttonText}
        </Link>
      </div>
      <Image
        alt="promo img"
        className={`absolute top-1/2 -translate-y-1/2 ${
          rightAlign ? "left-3 sm:left-10" : "right-3 sm:right-8.5"
        } -z-1`}
        height={260}
        src={imageUrl}
        width={214}
      />
    </div>
  );
}
