'use client';
import { motion } from "framer-motion";
import { NewsArticle } from "@/types";
import Image from "next/image";
import { useState } from "react";
import NewsModal from "./NewsModal";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

const NewsCard = ({ article, index }: NewsCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="bg-[#1E293B] rounded-xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col h-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative aspect-video w-full">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority={index < 6}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent opacity-60" />
        </div>
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
              {article.source}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white hover:text-blue-400 transition-colors line-clamp-2">
            {article.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mb-4 line-clamp-2 flex-1">
            {article.description}
          </p>
          <motion.span
            whileHover={{ x: 5 }}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-auto text-sm sm:text-base"
          >
            Read more →
          </motion.span>
        </div>
      </motion.article>

      <NewsModal
        article={article}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default NewsCard; 