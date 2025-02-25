'use client';
import { motion } from "framer-motion";
import Link from "next/link";
import { useCategory } from "@/context/CategoryContext";

const categories = ["AI", "Tech", "Startups", "Business", "Programming"];

const Navbar = () => {
  const { activeCategory, setActiveCategory } = useCategory();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-[#1E293B]/80 backdrop-blur-sm z-50 py-4 border-b border-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.h1 
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
              whileHover={{ scale: 1.05 }}
            >
              NewsAI
            </motion.h1>
          </Link>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors
                  ${activeCategory === category 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 