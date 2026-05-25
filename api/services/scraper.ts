/// <reference lib="dom" />
import { chromium, type Browser, type Page } from "playwright";

export interface ScrapedData {
  businessName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  services: string[];
  images: string[];
  rating: string;
  reviewCount: string;
  rawText: string;
}

let browser: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (!browser) {
    browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });
  }
  return browser;
}

export async function scrapeWithPlaywright(url: string): Promise<ScrapedData> {
  const startTime = Date.now();
  let page: Page | null = null;

  try {
    const bw = await getBrowser();
    page = await bw.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2000);

    interface ExtractedPageData {
      title: string;
      ogTitle: string;
      ogSiteName: string;
      description: string;
      phone: string;
      email: string;
      address: string;
      hours: string;
      services: string[];
      images: string[];
      rating: string;
      reviewCount: string;
      rawText: string;
    }

    const data = await page.evaluate(() => {
      const doc = document;
      const bodyText = doc.body?.innerText || "";

      const getMeta = (prop: string) =>
        doc.querySelector(`meta[property="${prop}"], meta[name="${prop}"]`)?.getAttribute("content") || "";

      const phoneMatch = bodyText.match(
        /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/
      );
      const emailMatch = bodyText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      const addrMatch = bodyText.match(
        /\d+\s+[A-Za-z0-9\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Way|Place|Pl|Suite|Ste|#)[,.\s]*(?:[A-Za-z\s]+)?(?:,\s*[A-Z]{2}\s*\d{5})?/i
      );

      const hoursPatterns = [
        /(?:Mon(?:day)?[\s-]*(?:Sun|Fri)(?:day)?)[\s:]*\d{1,2}[\s:]*(?:AM|PM|am|pm)?\s*[-to]\s*\d{1,2}[\s:]*(?:AM|PM|am|pm)?/i,
        /(?:Open|Hours)[\s:]*[^\n]*/i,
      ];
      let hours = "";
      for (const p of hoursPatterns) {
        const m = bodyText.match(p);
        if (m) { hours = m[0]; break; }
      }

      const services: string[] = [];
      const serviceKeywords = ["service", "offering", "what we", "our work", "solutions", "features"];
      doc.querySelectorAll("h2, h3").forEach((el: Element) => {
        const text = el.textContent?.toLowerCase() || "";
        if (serviceKeywords.some((kw) => text.includes(kw))) {
          let sib = el.nextElementSibling;
          for (let i = 0; i < 3 && sib; i++) {
            sib.querySelectorAll("h3, h4, li, .service-item").forEach((item: Element) => {
              const t = item.textContent?.trim();
              if (t && t.length < 80 && t.length > 2) services.push(t);
            });
            sib = sib.nextElementSibling;
          }
        }
      });

      const images: string[] = [];
      doc.querySelectorAll("img").forEach((img: HTMLImageElement) => {
        const src = img.getAttribute("src");
        if (src && src.startsWith("http") && !src.includes("icon") && !src.includes("logo")) {
          images.push(src);
        }
      });

      const ratingMatch = bodyText.match(/(\d\.\d)\s*(?:stars?|rating|\/\s*5)/i);
      const reviewMatch = bodyText.match(/(\d+)\s*(?:reviews?|Google reviews?)/i);

      return {
        title: doc.title || "",
        ogTitle: getMeta("og:title"),
        ogSiteName: getMeta("og:site_name"),
        description: getMeta("description") || getMeta("og:description"),
        phone: phoneMatch ? phoneMatch[0] : "",
        email: emailMatch ? emailMatch[0] : "",
        address: addrMatch ? addrMatch[0].replace(/\s+/g, " ").trim() : "",
        hours,
        services: [...new Set(services)].slice(0, 8),
        images: images.slice(0, 10),
        rating: ratingMatch ? ratingMatch[1] : "",
        reviewCount: reviewMatch ? reviewMatch[1] : "",
        rawText: bodyText.slice(0, 5000),
      };
    }) as ExtractedPageData;

    let businessName = data.ogSiteName || data.ogTitle || data.title || "Your Business";
    businessName = businessName.split(" | ")[0].split(" - ")[0].split(":")[0].trim();

    let tagline = data.description || "";
    if (tagline.length > 120) tagline = tagline.slice(0, 120) + "...";
    if (!tagline) tagline = `Professional services from ${businessName}`;

    console.log(`[Scraper] Scraped ${url} in ${Date.now() - startTime}ms`);

    return {
      businessName,
      tagline,
      description: data.description || `Welcome to ${businessName}. We provide quality services.`,
      phone: data.phone || "",
      email: data.email || "",
      address: data.address || "",
      hours: data.hours || "Mon-Fri: 9:00 AM - 5:00 PM",
      services: data.services.length > 0 ? data.services : ["Professional Service", "Consultation", "Custom Solutions"],
      images: data.images,
      rating: data.rating || "4.8",
      reviewCount: data.reviewCount || "150",
      rawText: data.rawText,
    };

  } catch (err: any) {
    console.error(`[Scraper] Error scraping ${url}:`, err.message);
    return createFallbackData(url);
  } finally {
    if (page) await page.close();
  }
}

function createFallbackData(url: string): ScrapedData {
  let name = "Your Business";
  try {
    const hostname = new URL(url).hostname.replace("www.", "").split(".")[0];
    name = hostname.charAt(0).toUpperCase() + hostname.slice(1);
  } catch { /* ok */ }
  return {
    businessName: name,
    tagline: `Quality ${name} Services`,
    description: `Welcome to ${name}! We provide exceptional service with a commitment to quality and customer satisfaction.`,
    phone: "(555) 000-0000",
    email: `contact@${name.toLowerCase().replace(/\s/g, "")}.com`,
    address: "",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM",
    services: ["Professional Service", "Consultation", "Custom Solutions", "Expert Support"],
    images: [],
    rating: "4.8",
    reviewCount: "150",
    rawText: "",
  };
}

process.on("SIGTERM", async () => {
  if (browser) { await browser.close(); browser = null; }
});
process.on("SIGINT", async () => {
  if (browser) { await browser.close(); browser = null; }
});
