// export default Navbar;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { logogf } from "../assets";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
 
  const navLinks = [
    {
      id: 1,
      name: "الرئيسية",
      path: "/",
    },

    {
      id: 2,
      name: "من نحن",
      path: "/about",
    },

    {
      id: 3,
      name: "منتجاتنا",
      type: "dropdown",
      key: "products",
      items: [
        { name: "مرايات حمام", path: "/MirrorCard" },
        { name: "مرايات ريسبشن", path: "/MirrorReception" },
        { name: "كبائن شاور", path: "/ShowersCard" },        

      ],
    },

    {
      id: 4,
      name: "تواصل معنا",
      path: "/Contactme",
    },

    {
      id: 5,
      name: "العملاء",
      type: "dropdown",
      key: "clients",
      items: [
        { name: "دخول العميل", path: "/clients" },
        { name: "دخول الإدارة", path: "/dashboard" },
      ],
    },
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
        {/* <ul className="hidden md:flex space-x-8">
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
        </ul> */}
        {/* Desktop Menu */}
<ul className="hidden md:flex items-center gap-8">
  {navLinks.map((link) => (
    <motion.li
      key={link.id}
      className="relative"
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => link.items && setOpenMenu(link.key)}
      onMouseLeave={() => setOpenMenu(null)}
    >
      {link.items ? (
        <>
          <button className="flex items-center gap-1 text-gray-300 hover:text-white duration-200">

            {link.name}

            <ChevronDown
              size={18}
              className={`transition-transform ${
                openMenu === link.key ? "rotate-180" : ""
              }`}
            />

          </button>

          <AnimatePresence>
            {openMenu === link.key && (
              <motion.ul
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: .25 }}
                className="absolute right-0 mt-4 w-56 rounded-xl bg-black/95 border border-gray-800 shadow-2xl overflow-hidden"
              >
                {link.items.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="block px-5 py-3 hover:bg-gray-800 transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          to={link.path}
          className="text-gray-300 hover:text-white duration-200"
        >
          {link.name}
        </Link>
      )}
    </motion.li>
  ))}
</ul>

        {/* Mobile Icon */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => {
            setOpen(!open);
            setOpenMenu(null);
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
            {/* Dropdown Menu */}
            {link.type === "dropdown" ? (
              <>
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === link.key ? null : link.key)
                  }
                  className="w-full flex justify-center items-center gap-2 text-gray-300 hover:text-white duration-200 tracking-wide text-xl font-extrabold"
                >
                  {link.name}

                  <ChevronDown
                    size={20}
                    className={`transition-transform ${
                      openMenu === link.key ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openMenu === link.key && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 space-y-3 text-gray-400"
                    >
                      {link.items.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            to={item.path}
                            onClick={() => setOpen(false)}
                            className="hover:text-white block"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
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
