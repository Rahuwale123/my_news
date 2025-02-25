import axios from 'axios';
import * as cheerio from 'cheerio';
import Parser from 'rss-parser';
import { NewsArticle } from '@/types';

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
});

// Default image for fallback
const DEFAULT_IMAGE = 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg';

// News sources configuration
const NEWS_SOURCES = {
  'AI': [
    'https://www.infoworld.com/category/artificial-intelligence/index.rss',
    'https://www.zdnet.com/topic/artificial-intelligence/rss.xml',
    'https://venturebeat.com/category/ai/feed/',
    'https://www.artificialintelligence-news.com/feed/',
    'https://aibusiness.com/feed',
    'https://www.datanami.com/category/machine_learning/feed/'
  ],
  'Tech': [
    'https://feeds.feedburner.com/TechCrunch',
    'https://www.theverge.com/rss/index.xml',
  ],
  'Programming': [
    'https://dev.to/feed/tag/programming',
    'https://dev.to/feed/tag/javascript',
    'https://dev.to/feed/tag/webdev',
    'https://www.freecodecamp.org/news/rss/',
    'https://blog.jetbrains.com/feed/',
    'https://css-tricks.com/feed/'
  ],
  'Business': [
    'https://feeds.feedburner.com/entrepreneur/latest',
    'https://www.business-standard.com/rss/technology-108.rss',
  ],
  'Startups': [
    'https://feeds.feedburner.com/TechCrunch/startups',
    'https://startupnation.com/feed/',
  ],
};

// Function to extract image from article content
async function extractImageFromUrl(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    
    // Try different ways to find an image
    const image = $('meta[property="og:image"]').attr('content') ||
                 $('meta[name="twitter:image"]').attr('content') ||
                 $('article img').first().attr('src') ||
                 $('img').first().attr('src');
    
    return image || DEFAULT_IMAGE;
  } catch (error) {
    return DEFAULT_IMAGE;
  }
}

// Function to extract full article content
async function extractArticleContent(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);

    // Remove unwanted elements
    $('script, style, nav, header, footer, .ads, #ads, .advertisement').remove();

    // Try different selectors for paragraphs
    let paragraphs: string[] = [];
    
    // Try article paragraphs first
    $('article p').each((_, element) => {
      const text = $(element).text().trim();
      if (text.length > 20) {
        paragraphs.push(text);
      }
    });

    // If no paragraphs found, try other common selectors
    if (paragraphs.length === 0) {
      $('.article-content p, .post-content p, .entry-content p, main p').each((_, element) => {
        const text = $(element).text().trim();
        if (text.length > 20) {
          paragraphs.push(text);
        }
      });
    }

    // If still no paragraphs, try getting text from main content divs
    if (paragraphs.length === 0) {
      const mainContent = $('article').first().text() ||
                         $('.article-content').text() ||
                         $('.post-content').text() ||
                         $('main').text() ||
                         $('[role="main"]').text();

      // Split by double newlines and filter
      paragraphs = mainContent
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(p => p.length > 20);
    }

    // Join paragraphs with double newlines
    return paragraphs.join('\n\n');
  } catch (error) {
    console.error('Error extracting article content:', error);
    return '';
  }
}

// Function to fetch news from multiple sources
async function fetchNewsFromSources(category: string): Promise<NewsArticle[]> {
  try {
    const sources = NEWS_SOURCES[category] || NEWS_SOURCES['Tech'];
    const allArticles: NewsArticle[] = [];

    await Promise.all(
      sources.map(async (feedUrl) => {
        try {
          const feed = await parser.parseURL(feedUrl);
          const articles = await Promise.all(
            feed.items.slice(0, 10).map(async (item) => {
              let imageUrl = DEFAULT_IMAGE;
              let fullContent = '';

              try {
                if (item.content) {
                  const $ = cheerio.load(item.content);
                  imageUrl = $('img').first().attr('src') || DEFAULT_IMAGE;
                }

                if (item.link) {
                  imageUrl = await extractImageFromUrl(item.link);
                  fullContent = await extractArticleContent(item.link);
                }
              } catch (error) {
                console.error('Error processing article:', error);
              }

              return {
                title: item.title || '',
                description: item.contentSnippet || '',
                content: fullContent || item.content || item.contentSnippet || '',
                url: item.link || '',
                imageUrl,
                source: feed.title || 'News Feed',
                category,
                publishedAt: item.pubDate || new Date().toISOString(),
              };
            })
          );
          allArticles.push(...articles);
        } catch (error) {
          console.error(`Error fetching from ${feedUrl}:`, error);
        }
      })
    );

    return allArticles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 24);
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getNews(category: string): Promise<NewsArticle[]> {
  try {
    const articles = await fetchNewsFromSources(category);
    return articles;
  } catch (error) {
    console.error('Error getting news:', error);
    return [];
  }
} 