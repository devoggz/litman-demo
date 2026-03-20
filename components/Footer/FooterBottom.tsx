import Image from "next/image";

const paymentsData = [
  {
    id: 1,
    image: "/images/payment/payment-06.svg",
    alt: "mpesa pay",
    width: 35,
    height: 24,
  },
  {
    id: 2,
    image: "/images/payment/payment-03.svg",
    alt: "master card",
    width: 33,
    height: 24,
  },
  {
    id: 3,
    image: "/images/payment/payment-01.svg",
    alt: "Visa",
    width: 33,
    height: 24,
  },
];

export default function FooterBottom() {
  const year = new Date().getFullYear();

  return (
    <div className="py-5 xl:py-7.5 border-t border-gray-5">
      <div className="px-4 mx-auto max-w-7xl sm:px-8 xl:px-0">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <p className="text-sm font-normal text-dark-6">
            All rights reserved &copy; {year} Studio Kalawaks.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-normal">We Accept:</p>

            <div className="flex flex-wrap items-center gap-5">
              {paymentsData.map((payment) => (
                <Image
                  key={payment?.id}
                  alt={payment.alt}
                  className="h-8"
                  height={payment.height}
                  src={payment.image}
                  width={payment.width}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
