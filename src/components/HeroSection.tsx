'use client';
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
              Build Something <span className="text-blue-600">Amazing</span> with Next.js
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Create fast, scalable, and SEO-friendly web applications with the power of React and Next.js
            </p>
            <motion.div 
              className="flex gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                Get Started
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              <Image
                src="https://cdn.dribbble.com/userupload/13133188/file/original-2f26c4fbc2e3f11c8a0f0bd4c0a1b7fb.jpg?resize=1200x900"
                alt="Hero Image"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 