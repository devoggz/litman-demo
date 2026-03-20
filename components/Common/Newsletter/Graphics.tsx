import Image from "next/image";

export default function Graphics() {
  return (
    <>
      <Image
        alt="background illustration"
        className="absolute -z-1 w-full h-full left-0 top-0 rounded-xl"
        height={200}
        src="/images/shapes/newsletter-bg.jpg"
        width={1170}
      />
      <div className="absolute -z-1 max-w-[523px] max-h-[243px] w-full h-full right-0 top-0 bg-gradient-1" />
    </>
  );
}
