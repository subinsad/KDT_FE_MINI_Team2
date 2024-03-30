import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import banner1 from '../../img/banner.png';

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
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
    );
}

export default Banner;
