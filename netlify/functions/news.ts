import { Handler } from '@netlify/functions';
import { getNews } from '../../src/utils/scraper';

export const handler: Handler = async (event) => {
  try {
    const category = event.queryStringParameters?.category || 'AI';
    const articles = await getNews(category);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articles),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch news' }),
    };
  }
}; 