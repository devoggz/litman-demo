"use client";
import type { SwiperRef } from "swiper/react";

import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import SingleItem from "./SingleItem";

import { ChevronLeftIcon, ChevronRightIcon } from "@/app/assets/icons";
import "swiper/css";
import "swiper/css/navigation";
import { Category } from "@/types/category";

export default function CategoryCarouselArea({
  categories,
}: {
  categories: Category[];
}) {
  const sliderRef = useRef<SwiperRef>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current?.swiper) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current?.swiper) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      // @ts-ignore
      sliderRef.current.swiper.init();
    }
  }, []);

  const onSlideChange = useCallback(() => {
    if (sliderRef.current?.swiper) {
      setCurrentIndex(sliderRef.current.swiper.activeIndex);
      setIsEnd(sliderRef.current.swiper.isEnd);
    }
  }, []);

  return (
    <div className="swiper categories-carousel common-carousel">
      {/* <!-- section title --> */}
      <div className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-xl font-semibold xl:text-heading-5 text-dark-6">
            Browse by Category
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            aria-label="previous button"
            className={`swiper-button-prev ${
              currentIndex === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
            disabled={currentIndex === 0}
            onClick={handlePrev}
          >
            <ChevronLeftIcon />
          </button>

          <button
            aria-label="next button"
            className={`swiper-button-next ${
              isEnd ? "opacity-50 pointer-events-none " : ""
            }`}
            disabled={isEnd}
            onClick={handleNext}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <Swiper
        ref={sliderRef}
        breakpoints={{
          // when window width is >= 640px
          0: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 4,
          },
          // when window width is >= 768px
          1200: {
            slidesPerView: 6,
          },
        }}
        slidesPerView={6}
        onSlideChange={onSlideChange}
      >
        {categories.length > 0 &&
          categories.map((item, key) => (
            <SwiperSlide key={key}>
              <SingleItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
