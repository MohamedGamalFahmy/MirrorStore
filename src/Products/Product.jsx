import ShowersCard from './ShowersCard '
import MirrorCard from './MirrorCard';
import ReceptionMirorrCard from './ReceptionMirorrCard';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './styles.css';

// import required modules
import { EffectCards } from 'swiper/modules';
import { b24, b32, b17 ,s1,s2,s3 ,r1,r2,r14} from '../assets';
import { Link } from 'react-router-dom';



const Products = () => {
  return (
    <div className='py-8' >
      <div className=' text-white font-extrabold'>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'circIn' }}
          className='text-teal-600 font-extrabold text-center pb-5 text-5xl'>Products</motion.h1>
      </div>
      {/* MirrorBathRoomCard */}
      <div className='  sm:container mx-auto grid sm:grid-cols-1 md:container  md:grid-cols-2 lg:grid-cols-3 gap-6 '>
        <div className=" flex  shadow-orange-500 shadow-lg w-full rounded-2xl border border-yellow-400  ">
          <div className=' flex flex-col  w-full h-full rounded-2xl'>
            <h1 >MirrorBathRoom  </h1>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              className="gallery-swiper  "
            >
              <SwiperSlide className='w-3/4' ><img src={b17} alt="" /></SwiperSlide>
              <SwiperSlide><img src={b24} alt="" /></SwiperSlide>
              <SwiperSlide><img src={b32} alt="" /></SwiperSlide>

            </Swiper>

            <div className='  h-20 mb-3 mx-auto w-9/12'>
              <button type="button" className="btn ">
                <Link to='/MirrorCard'>
                  <strong> More </strong>
                  <div id="container-stars">
                    <div id="stars"></div>
                  </div>
                  <div id="glow">
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                </Link>
              </button>
            </div>
            {/* فثءف */}

            {/* test */}
          </div>
          {/* ااااااااااااااااااااااااااااااااااااااا */}
        </div>
        {/* Showers */}
        <div className=" flex  shadow-orange-500 shadow-lg w-full rounded-2xl border border-yellow-400  ">
          <div className=' flex flex-col  w-full h-full rounded-2xl'>
            <h1 >ShowersBathRoom  </h1>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              className="gallery-swiper  "
            >
              <SwiperSlide className='w-3/4' ><img src={s2} alt="" /></SwiperSlide>
              <SwiperSlide><img src={s1} alt="" /></SwiperSlide>
              <SwiperSlide><img src={s3} alt="" /></SwiperSlide>

            </Swiper>

            <div className='  h-20 mb-3 mx-auto w-9/12'>
              <button type="button" className="btn ">
                <Link to='/ShowersCard'>
                  <strong> More </strong>
                  <div id="container-stars">
                    <div id="stars"></div>
                  </div>
                  <div id="glow">
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                </Link>
              </button>
            </div>
            {/* فثءف */}

            {/* test */}
          </div>
        </div>
        {/* ReceptionMirorrCard */}

        <div className=" flex  shadow-orange-500 shadow-lg w-full rounded-2xl border border-yellow-400  ">
          <div className=' flex flex-col  w-full h-full rounded-2xl'>
            <h1 >MirrorRecptions  </h1>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              className="gallery-swiper  "
            >
              <SwiperSlide className='w-3/4' ><img src={r14} alt="" /></SwiperSlide>
              <SwiperSlide><img src={r1} alt="" /></SwiperSlide>
              <SwiperSlide><img src={r2} alt="" /></SwiperSlide>

            </Swiper>

            <div className='  h-20 mb-3 mx-auto w-9/12'>
              <button type="button" className="btn ">
                <Link to='/MirrorReception'>
                  <strong> More </strong>
                  <div id="container-stars">
                    <div id="stars"></div>
                  </div>
                  <div id="glow">
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                </Link>
              </button>
            </div>
            {/* فثءف */}

            {/* test */}
          </div>
        </div>

      </div>


    </div>
  )
}

export default Products