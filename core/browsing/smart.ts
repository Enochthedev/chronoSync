import puppeteer from 'puppeteer';
import { askOllama } from '../ai/ollama.service';
import { learnFrom } from '../ai/trainer';

export async function smartBrowseAndSummarize(prompt: string): Promise<string> {
  try {
    const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(prompt)}`;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Try to get the first result link
    const link = await page.$eval('.result__title a', el => el.getAttribute('href')).catch(() => null);

    if (!link) {
      await browser.close();
      return '❌ Could not find a result to browse.';
    }

    await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Extract text content
    const pageText = await page.evaluate(() => document.body?.innerText || '');

    await browser.close();

    const snippet = pageText.slice(0, 4000); // Trim to safe token limit
    const finalPrompt = `Summarize this for the user:\n\n${snippet}`;
    const summary = await askOllama(finalPrompt);

    // Learn from the content
    await learnFrom({
      content: summary,
      query: prompt,
      source: 'browsing',
    });

    return summary;
  } catch (error) {
    console.error('🌐 Browsing failed:', error);
    return '❌ Failed to browse and summarize the result. Try again later or rephrase your request.';
  }
}