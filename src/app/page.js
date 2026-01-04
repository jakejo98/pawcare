"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SearchForm from "@/components/searchForm";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationState, setAnimationState] = useState("visible"); // "visible" | "exit" | "enter"
  const animals = ["강아지", "고양이", "토끼", "햄스터", "앵무새", "도마뱀", "물고기"];

  const banners = [
    "/images/event-banner-1.svg",
    "/images/event-banner-2.svg",
    "/images/event-banner-3.svg",
    "/images/event-banner-4.svg"
  ];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const swiperRef = useRef(null);

  // Swiper 반응형 업데이트
  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.update();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // currentIndex가 변경되면 새 텍스트가 아래에서 시작
  useEffect(() => {
    if (animationState === "enter") {
      const timer = setTimeout(() => {
        setAnimationState("visible");
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, animationState]);

  useEffect(() => {
    const interval = setInterval(() => {
      // 기존 텍스트 위로 사라짐
      setAnimationState("exit");
      
      // 애니메이션 후 텍스트 변경 및 새 텍스트 아래에서 올라옴
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % animals.length);
        // 새 텍스트는 아래에서 시작
        setAnimationState("enter");
      }, 300); // transition duration과 맞춤
    }, 2000); // 2초마다 변경

    return () => clearInterval(interval);
  }, [animals.length]);

  return (
    <main>
      {/* main-visual */}
      <div className="flex lg:justify-center items-center mt-[48px] mb-[32px] md:mt-[60px] md:mb-[40px] lg:mt-[72px] lg:mb-[48px]">
        <h2 className="text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-[1.5]">
          포우케어에서{" "}
          <br className="lg:hidden" />
          <span className="relative inline-flex items-center overflow-hidden">
            <span
              key={currentIndex}
              className={`inline-block text-green-500 transition-all duration-300 ${
                animationState === "exit"
                  ? "opacity-0 -translate-y-[20px]"
                  : animationState === "enter"
                  ? "opacity-0 translate-y-[20px]"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {animals[currentIndex]}
            </span>
          </span>{" "}
          찾고 계신가요?
        </h2>
      </div>
      {/* Search-form */}
      <SearchForm />
      {/* Event-banner */}
      <div className="relative w-full mt-[26px] md:mt-[30px] lg:mt-[40px] flex justify-center">
        <div className="w-[calc(100%+40px)] md:w-full max-w-[800px] -ml-[20px] -mr-[20px] md:ml-0 md:mr-0">
          <div className="relative">
            <Swiper
              ref={swiperRef}
              modules={[Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={false}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              onSlideChange={(swiper) => setCurrentBannerIndex(swiper.activeIndex)}
            >
              {banners.map((banner, index) => (
                <SwiperSlide key={index}>
                  <Link href="/">
                    <div className="relative cursor-pointer">
                      <img
                        src={banner}
                        alt={`Event Banner ${index + 1}`}
                        className="w-full h-auto object-cover md:rounded-[16px]"
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Pagination */}
            <div className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 flex gap-[8px] md:gap-[10px] z-10">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (swiperRef.current) {
                      swiperRef.current.swiper.slideTo(index);
                    }
                  }}
                  className={`w-[8px] h-[8px] md:w-[10px] md:h-[10px] rounded-full transition-all duration-300 ${
                    index === currentBannerIndex
                      ? 'bg-white'
                      : 'bg-white opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
