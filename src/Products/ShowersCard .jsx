import React, { useState } from "react";
import { showers, bgcard } from '../assets/'
import { motion } from 'framer-motion'
import { FaWhatsapp } from "react-icons/fa";

const ShowersCard = () => {
  const phoneNumber = "201550732863";

  return (
    <div className='container mx-auto  mt-20 '>
      <div className=' xs:container xs:grid grid-cols-1 xs:mx-auto md:grid  md:grid-cols-3 lg:grid lg:grid-cols-4 gap-5  '>


        {showers.map((mirror) =>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='   shadow-orange-500 shadow-lg  bg-black rounded-2xl'
            whileHover={{ scale: 1.05 }}
          >

            <img src={mirror.imge} alt="" className='h-[500px] w-full rounded-2xl  ' />
            <div className="flex items-center justify-around mx-auto">
              <p className='text-left text-xl ml-3'>Code - <samp>{mirror.name}</samp>

              </p>
              <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                  ` كود الشاور :\n${mirror.name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-medium px-3 py-2 rounded-lg transition-all duration-300 my-2"
              >
                <FaWhatsapp className="text-xl text-green-400" />
                إرسال كود المنتج
              </a>
            </div>
          </motion.div>

        )


        }
      </div>

    </div>
  )
}

export default ShowersCard 
