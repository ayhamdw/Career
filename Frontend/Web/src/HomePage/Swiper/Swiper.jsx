import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";
import { ServiceData } from "../HomePage";

function ImageSwiper() {
  return (
    <div className="imagessw flex items-center justify-center flex-col mt-10 w-full">
      <Swiper
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        freeMode={false}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="max-w-[100%] lg:max-w-full h-full"
      >
        {ServiceData.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="test flex flex-col group relative shadow-lg text-white rounded-xl px-6 py-8 h-[400px] lg:h-[500px] overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-contain bg-center"
                style={{ backgroundImage: `url(${item.backgroundImage})` }}
              />
              <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20" />
              <div className="relative flex flex-col gap-3">
                <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" />
                <h1 className="text-xl lg:text-2xl">{item.title}</h1>
                <p className="lg:text-[18px]">{item.content}</p>
              </div>
              <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageSwiper;
