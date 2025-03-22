import fetch from 'node-fetch';
import cheerio from 'cheerio';

export async function browse(query: string): Promise<string> {
  try {
    const response = await fetch(`https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`);
    const html = await response.text();

    const $ = cheerio.load(html);
    const results: string[] = [];

    $('a.result-link').each((_, el) => {
      const text = $(el).text();
      const link = $(el).attr('href');
      results.push(`${text} - ${link}`);
    });

    if (results.length === 0) return '❌ No search results found.';

    return `🔎 Top results for: *${query}*\n\n` + results.slice(0, 5).join('\n');
  } catch (err) {
    return '⚠️ Error occurred during browsing.';
  }
}