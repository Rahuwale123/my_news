'use client';
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
}

export default function FeatureCard({ title, description, icon, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="w-12 h-12 bg-blue-600 rounded-full mb-4 flex items-center justify-center">
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
} 