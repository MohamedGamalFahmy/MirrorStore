import React from 'react'
import { mirrorbs } from '../assets'
import { motion } from 'framer-motion'
const MirrorCard = () => {
    return (
        <div className='container mx-auto  mt-20 '>
            <div className=' xs:container xs:mx-auto xs:grid grid-cols-2 md:grid  md:grid-cols-3 lg:grid lg:grid-cols-4 gap-5'>


                {mirrorbs.map((mirror) =>
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className='   shadow-orange-500 shadow-lg'
                        whileHover={{ scale: 1.05 }}
                    >
                        <h1 className='text-left text-xl'>Code - <samp>{mirror.name}</samp>

                        </h1>
                        <img src={mirror.imge} alt="" className='w-[100%] h-[300px] ' />

                    </motion.div>

                )


                }
            </div>

        </div>
    )
}

export default MirrorCard