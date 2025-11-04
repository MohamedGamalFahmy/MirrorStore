import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Mirrors", path: "/MirrorReception" },
    { id: 3, name: "ShowersCard", path: "/ShowersCard" },
    { id: 5, name: "MirrorBathRoom", path: "/MirrorCard" },
    { id: 4, name: "Contact", path: "/Contactme" },

  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md shadow-lg border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        <motion.h1
          className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          GF for Glass
        </motion.h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <motion.li
              key={link.id}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={link.path}
                className="text-gray-300 hover:text-white duration-200  tracking-wide"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <X size={28} className="text-gray-300" /> : <Menu size={28} className="text-gray-300" />}
        </div>
      </div>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800"
          >
            <ul className="flex flex-col items-center py-4 space-y-4">
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setOpen(false)}
                >
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white duration-200  tracking-wide  text-xl font-extrabold "
                  >
                    {link.name}
                  </Link>
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
