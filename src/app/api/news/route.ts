import { NewsArticle } from "@/types";
import { NextResponse } from "next/server";
import { getNews } from "@/utils/scraper";

// This is a placeholder. You'll need to implement actual scraping logic
const mockNews: NewsArticle[] = [
  {
    title: "OpenAI Announces GPT-5",
    description: "OpenAI has unveiled its latest language model with unprecedented capabilities in natural language processing and understanding, marking a significant leap forward in AI technology.",
    url: "https://example.com/news/1",
    imageUrl: "https://source.unsplash.com/random/800x600/?artificial-intelligence",
    source: "TechCrunch",
    category: "AI",
    publishedAt: "2024-03-20",
  },
  {
    title: "The Future of Quantum Computing",
    description: "Scientists achieve breakthrough in quantum computing stability, paving the way for practical applications in cryptography and drug discovery.",
    url: "https://example.com/news/2",
    imageUrl: "https://source.unsplash.com/random/800x600/?technology",
    source: "Wired",
    category: "Tech",
    publishedAt: "2024-03-20",
  },
  {
    title: "Revolutionary Startup Raises $100M",
    description: "A startup focusing on sustainable energy solutions has secured major funding to scale their innovative carbon capture technology.",
    url: "https://example.com/news/3",
    imageUrl: "https://source.unsplash.com/random/800x600/?startup",
    source: "TechCrunch",
    category: "Startups",
    publishedAt: "2024-03-20",
  },
  {
    title: "New Programming Language Gains Traction",
    description: "A modern programming language designed for AI development is seeing rapid adoption among developers worldwide.",
    url: "https://example.com/news/4",
    imageUrl: "https://source.unsplash.com/random/800x600/?programming",
    source: "Dev.to",
    category: "Programming",
    publishedAt: "2024-03-20",
  },
  {
    title: "Global Tech Investment Trends",
    description: "Analysis shows significant shift in tech investment patterns with focus on AI and sustainable technologies.",
    url: "https://example.com/news/5",
    imageUrl: "https://source.unsplash.com/random/800x600/?business",
    source: "Bloomberg",
    category: "Business",
    publishedAt: "2024-03-20",
  },
  {
    title: "Breakthrough in Machine Learning",
    description: "Researchers develop new algorithm that significantly reduces AI training time while improving accuracy.",
    url: "https://example.com/news/6",
    imageUrl: "https://source.unsplash.com/random/800x600/?machine-learning",
    source: "MIT Tech Review",
    category: "AI",
    publishedAt: "2024-03-20",
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'AI';

    const articles = await getNews(category);

    if (articles.length === 0) {
      return NextResponse.json([
        {
          title: "Unable to fetch news at the moment",
          description: "Please try again later or check another category",
          url: "#",
          imageUrl: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
          source: "System",
          category,
          publishedAt: new Date().toISOString(),
        }
      ]);
    }

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
} 