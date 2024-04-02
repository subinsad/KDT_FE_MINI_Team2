import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import banner1 from "../../img/banner1.png";
import banner2 from "../../img/banner2.png";
import banner3 from "../../img/banner3.png";
import banner4 from "../../img/banner4.png";
import banner5 from "../../img/banner5.png";

function Banner() {
  return (
    <Swiper
      className="w-full h-[26rem] bg-slate-300 rounded"
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      navigation={true}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }} // 페이지네이션 설정
    >
      <SwiperSlide>
        <img
          src={banner1}
          alt="Slide 1"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={banner2}
          alt="Slide 2"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={banner3}
          alt="Slide 3"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={banner4}
          alt="Slide 4"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={banner5}
          alt="Slide 5"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
