'use client';
import { motion, AnimatePresence } from "framer-motion";
import { NewsArticle } from "@/types";
import NewsCard from "./NewsCard";
import { useEffect, useState } from "react";
import { useCategory } from "@/context/CategoryContext";

const NewsFeed = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { activeCategory } = useCategory();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/news?category=${activeCategory}`);
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 600000);
    return () => clearInterval(interval);
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-12 h-12 border-t-2 border-r-2 border-blue-400"
        />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
      >
        {articles.map((article, index) => (
          <NewsCard key={`${article.url}-${index}`} article={article} index={index} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default NewsFeed; 