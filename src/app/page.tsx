'use client';
import Navbar from "@/components/Navbar";
import NewsFeed from "@/components/NewsFeed";
import { motion } from "framer-motion";
import { CategoryProvider } from "@/context/CategoryContext";

export default function Home() {
  return (
    <CategoryProvider>
      <div className="min-h-screen bg-[#0F172A] text-white">
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
              Latest Tech & AI News
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Stay updated with the latest developments in technology and artificial intelligence
            </p>
          </motion.div>
          <NewsFeed />
        </main>
        
        <footer className="py-8 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-400">
                © 2024 NewsAI. Updated every 10 minutes.
              </p>
              <p className="text-gray-400">
                Powered by Next.js
              </p>
            </div>
          </div>
        </footer>
      </div>
    </CategoryProvider>
  );
}
