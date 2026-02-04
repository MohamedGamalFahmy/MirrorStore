// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X } from "lucide-react";
// import { logogf } from "../assets";
// const Navbar = () => {
//   const [open, setOpen] = useState(false);


//   const navLinks = [
//     { id: 1, name: "Home", path: "/" },
//     { id: 2, name: "MirrorReception", path: "/MirrorReception" },
//     { id: 3, name: "ShowersCard", path: "/ShowersCard" },
//     { id: 5, name: "MirrorBathRoom", path: "/MirrorCard" },
//     { id: 4, name: "Contact", path: "/Contactme" },
//   ];

//   return (
//     <motion.nav
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="fixed top-0 left-0 w-full  z-50 bg-black/90 backdrop-blur-md shadow-lg border-b border-gray-800"
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6  text-white">
//         <div className="flex justify-center items-center">
//           <img src={logogf} alt="" className="w-30 h-20" />
//           <motion.h1
//             className="text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 cursor-pointer justify-center"
//             whileHover={{ scale: 1.05 }}
//           >
//            Gamal Fahmy
//           </motion.h1>
//         </div>
//         {/* Desktop Links */}
//         <ul className="hidden md:flex space-x-8">
//           {navLinks.map((link) => (
//             <motion.li
//               key={link.id}
//               whileHover={{ scale: 1.1 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Link
//                 to={link.path}
//                 className="text-gray-300 hover:text-white duration-200  tracking-wide"
//               >
//                 {link.name}
//               </Link>
//             </motion.li>
//           ))}
//         </ul>

//         {/* Mobile Menu Icon */}
//         <div
//           className="md:hidden cursor-pointer"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? (
//             <X size={28} className="text-gray-300" />
//           ) : (
//             <Menu size={28} className="text-gray-300" />
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu (Animated) */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.4 }}
//             className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800"
//           >
//             <ul className="flex flex-col items-center py-4 space-y-4">
//               {navLinks.map((link) => (
//                 <motion.li
//                   key={link.id}
//                   whileHover={{ scale: 1.05 }}
//                   onClick={() => setOpen(false)}
//                 >
//                   <Link
//                     to={link.path}
//                     className="text-gray-300 hover:text-white duration-200  tracking-wide  text-xl font-extrabold "
//                   >
//                     {link.name}
//                   </Link>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { logogf } from "../assets";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openShower, setOpenShower] = useState(false);

  const navLinks = [
    { id: 1, name: "الرائسيه", path: "/" },
    { id: 2, name: "مرايات الريسبشن", path: "/MirrorReception" },
    { id: 3, name: "كبائن شاور", path: "/ShowersCard" },
    { id: 5, name: "مرايات حمام", path: "/MirrorCard" },
    { id: 4, name: "تواصل ", path: "/Contactme" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md shadow-lg border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 text-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logogf} alt="GF Logo" className="w-30 h-20" />
          <motion.h1
            className="text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Gamal Fahmy
          </motion.h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <motion.li
              key={link.id}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={link.path}
                className="text-gray-300 hover:text-white duration-200 tracking-wide"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Icon */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => {
            setOpen(!open);
            setOpenShower(false);
          }}
        >
          {open ? (
            <X size={28} className="text-gray-300" />
          ) : (
            <Menu size={28} className="text-gray-300" />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800"
          >
            <ul className="flex flex-col items-center py-6 space-y-5">
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  className="w-full text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Showers Sub Menu */}
                  {link.name === "ShowersCard" ? (
                    <>
                      <button
                        onClick={() => setOpenShower(!openShower)}
                        className="w-full flex justify-center items-center gap-2 text-gray-300 hover:text-white duration-200 tracking-wide text-xl font-extrabold"
                      >
                        Showers
                        <ChevronDown
                          size={20}
                          className={`transition-transform ${
                            openShower ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {openShower && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 space-y-3 text-gray-400"
                          >
                            <li>
                              <Link
                                to="/shower-spanish"
                                onClick={() => setOpen(false)}
                                className="hover:text-white block"
                              >
                                Shower Spanish
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/shower-french"
                                onClick={() => setOpen(false)}
                                className="hover:text-white block"
                              >
                                Shower French
                              </Link>
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className="text-gray-300 hover:text-white duration-200 tracking-wide text-xl font-extrabold block"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
