import React from 'react'
import Contactme from './Contactme'
import { FaFacebook, FaInstagram, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import { li } from 'framer-motion/client';
import { Link } from 'react-router-dom';
import { logogf } from '../assets';
const Footer = () => {
  const Links = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "MirrorReception", path: "/MirrorReception" },
    { id: 3, name: "ShowersCard", path: "/ShowersCard" },
    { id: 5, name: "MirrorBathRoom", path: "/MirrorCard" },
    { id: 4, name: "Contact", path: "/Contactme" },

  ];
  const Namberphone = [
    { id: 1, num: "01067341683" ,img:<FaPhoneAlt/> },
    { id: 2, num: "01224885277",img:<FaPhoneAlt/> },
    { id: 3, num: "01550732863" ,img:<FaPhoneAlt/>},
  ];
  return (
    <div className='flex-col container shadow-orange-400 shadow-xl mx-auto bg-black  xs:grid xs:grid-cols-1 sm:grid sm:grid-cols-1  md:grid-cols-1  '>
      <div className='con'></div>
      <div className=' flex'>
        <div className='   xs:grid xs:grid-cols-1 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-3  '>
          <div className=" backdrop-blur-md  text-gray-200 text-center py-10  overflow-hidden">
            <img src={logogf} alt="" className='w-50 h-20 mx-auto'/>
            <h2 className="text-2xl font-extrabold text-silver tracking-wider mb-3">
              GF <span className="text-gray-400">for Glass & Mirorrs</span>
            </h2>
            <p className="px-2 text-xl text-gray-300/70 max-w-md mx-auto md:mb-5 leading-relaxed">
              مرايات وكبائن بتصميم عصري وجودة فاخرة تعكس ذوقك الرفيع ✨
              متاح تنفيذ جميع المقاسات والإضاءات .
              عليك اختيار الديزين  والمقاس وعلينا التنفيذ في اسرع وقت
            </p>

          </div>
          {/* روابط التواصل */}

          <div className=" ">
            <h1 className='items-center justify-center mt-5 '>للتواصل </h1>

            <div className="flex justify-center gap-6 mb-6 pt-3 text-4xl " >

              <a
                href="https://wa.me/201067341683"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-all duration-300"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.instagram.com/modygamal33/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-all duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/mohamed.gamall.755937"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-all duration-300"
              >
                <FaFacebook />
              </a>
            </div>
            <div className=' flex justify-center items-center ml-4 xs:grid xs:grid-cols-1 md:grid md:grid-cols-1 lg:grid-cols-3  '>
              {Namberphone.map((item) =>

                <samp id={item.id} className='flex gap-2 items-center mx-auto text-2xl text-white lg:text-sm lg:gap-1'>{item.img} - <samp>{item.num  } </samp> </samp>

              )}

            </div>
          </div>
          {/* روابط الصفحات */}
          <div className=' flex flex-col justify-center items-center'>
            <ul className='flex flex-col justify-center items-center pt-5 text-xl space-y-1'>
              {Links.map((item) =>
                <Link
                  to={item.path}
                  className="text-gray-300 hover:text-orange-400 duration-200 pt-1 tracking-wide"
                >
                  {item.name}
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* توقيع */}
      <div className="  border border-white/20 text-xl  py-3 text-silver  " style={{ letterSpacing: "2px" }}>
        <p className=' text-center text-gray-200 '>
          © {new Date().getFullYear()} GF for Glass — Designed & Developed by
          <span className="text-orange-500 font-semibold"> Mohamed Gamal</span>
        </p>
      </div>
    </div>

  )
}

export default Footer
