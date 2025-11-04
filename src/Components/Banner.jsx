import React from 'react'
import {mirrorbs } from '../assets';
import { useRef, useState } from 'react';
import { motion } from "framer-motion";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../App.css';
import './Banner.css';
// import required modules
import { EffectCoverflow, Autoplay } from 'swiper/modules';

const Banner = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">


      <Swiper
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className=" mySwiper absolute top-0 left-0 w-full h-full object-cover brightness-90"
      >
        
        {mirrorbs.map((mirror) => (


          <SwiperSlide>
            
            <img src={mirror.imge} />
            
          </SwiperSlide>
        ))}

      </Swiper>
      {/* Overlay */}
      <div className="bg-black/15"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute z-10 inset-0 flex flex-col items-center justify-center text-center text-white px-4 bg-black/30"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
          مرايات وكبائن بتصميم عصري... تخلي كل ركن في بيتك يحكي عن ذوقك.
        </h1>
      </motion.div>

    </section >
  )
}

export default Banner