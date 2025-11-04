import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaFacebook, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Contactme = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white px-6 py-16">
      {/* خلفية فخمة شفافة */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"
      />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl backdrop-blur-md bg-black/40 border border-gray-700 rounded-3xl p-10 shadow-2xl"
      >
        <h1 className="text-5xl font-bold mb-4 text-silver tracking-wide">
          GF <span className="text-gray-400">for Glass</span>
        </h1>
        <h1>Haj <h4 className="-tracking-tighter">GamalFahmy</h4> <p className="mb-3">اسم لو تاريخ في عالم الزجاج </p></h1>
        <p className="text-gray-300 text-lg mb-3 leading-relaxed">
         ✨ نُقدّم أجمل تصميمات المرايات وكبائن الشاور بتفاصيل عصرية وجودة عالية.
           
        </p>

        {/* بيانات التواصل */}
        <div className="space-y-4 text-gray-200 text-lg mb-3">
          <div className="flex justify-center items-center gap-3">
            <FaPhoneAlt className="text-silver" />
            <p>01067341683 - 01224885277</p>
          </div>
          <div className="flex justify-center items-center gap-3">
            <FaMapMarkerAlt className="text-silver" />
            <p> شارع عبدلله الموان متفرع مش شارع محمد سعيد -بيرأم سلطان -القاهره</p> 
          </div>
        </div>

        {/* أيقونات التواصل */}
        <div className="flex justify-center gap-8 text-3xl">
          <a
            href="https://wa.me/201067341683"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-all duration-300"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-all duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-all duration-300"
          >
            <FaFacebook />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contactme