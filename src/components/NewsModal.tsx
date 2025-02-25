'use client';
import { motion, AnimatePresence } from "framer-motion";
import { NewsArticle } from "@/types";
import Image from "next/image";

interface NewsModalProps {
  article: NewsArticle;
  isOpen: boolean;
  onClose: () => void;
}

const NewsModal = ({ article, isOpen, onClose }: NewsModalProps) => {
  if (!isOpen) return null;

  const paragraphs = article.content.split('\n\n').filter(p => p.trim().length > 0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#1E293B] rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto no-scrollbar relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative aspect-video w-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent opacity-60" />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                  {article.source}
                </span>
                <span className="text-sm text-gray-400">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {article.title}
            </h2>
            <div className="prose prose-invert max-w-none">
              {paragraphs.map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-gray-300 text-lg leading-relaxed mb-6 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
              <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between items-center">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2"
                >
                  View original article on {article.source}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <span className="text-gray-400">
                  {article.category}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewsModal; 