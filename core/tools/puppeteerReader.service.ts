import puppeteer from 'puppeteer';
import { askOllama } from '../ai/ollama.service.js';

export async function smartBrowseAndSummarize(query: string): Promise<string> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Use realistic headers to avoid bot detection
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.90 Safari/537.36'
    );

    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

    // Wait and get first valid result
    await page.waitForSelector('div.g a', { timeout: 10000 });
    const firstResult = await page.$eval('div.g a', (el) => el.getAttribute('href'));

    if (!firstResult) return '❌ Couldn’t extract the first result link.';

    // Navigate to first result
    await page.goto(firstResult, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Extract text content from readable containers
    const content = await page.evaluate(() => {
      const selectors = ['article', 'main', 'section', 'body'];
      const text = selectors
        .flatMap((sel) => Array.from(document.querySelectorAll(sel)))
        .map((el) => (el as HTMLElement).innerText)
        .join('\n')
        .replace(/\n\s*\n/g, '\n\n');
      return text.slice(0, 6000);
    });

    if (!content || content.length < 100) {
      return '⚠️ Could not extract readable content from the page.';
    }

    const summary = await askOllama(`Summarize this for a user:\n\n${content}`);
    return `🧠 **Summary from top result** (${firstResult}):\n\n${summary}`;
  } catch (err) {
    console.error('[smartBrowse Error]', err);
    return '❌ I was unable to browse and fetch the latest information. You can try again later or use a more specific query.';
  } finally {
    await browser.close();
  }
}