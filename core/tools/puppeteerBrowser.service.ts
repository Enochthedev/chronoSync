import puppeteer from 'puppeteer';

export async function puppeteerBrowse(query: string): Promise<string[]> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

    // Wait for result links to load
    await page.waitForSelector('a.result__a');

    // Extract top 5 result titles and URLs
    const results = await page.$$eval('a.result__a', (links) =>
      links.slice(0, 5).map((link) => `${link.textContent} - ${link.getAttribute('href')}`)
    );

    return results;
  } catch (error) {
    console.error('[Browse Error]', error);
    return ['❌ Failed to fetch results.'];
  } finally {
    await browser.close();
  }
}