/**
 * Kimi AI Content Generation Service
 * Uses the Kimi API to generate website content from scraped data
 */

const KIMI_API_URL = "https://api.moonshot.cn/v1/chat/completions";
const KIMI_MODEL = "moonshot-v1-8k";

export interface AIContent {
  businessName: string;
  tagline: string;
  description: string;
  services: string[];
  phone: string;
  email: string;
  address: string;
  hours: string;
  heroHeadline: string;
  heroSubtext: string;
  aboutText: string;
  testimonials: { name: string; text: string }[];
  ctaText: string;
  seoTitle: string;
  seoDescription: string;
}

function getApiKey(): string {
  return process.env.KIMI_API_KEY || "";
}

export async function generateContentWithAI(
  scrapedData: {
    businessName: string;
    description: string;
    services: string[];
    phone: string;
    email: string;
    address: string;
    hours: string;
    rawText: string;
  },
  industryName: string,
): Promise<AIContent> {
  const apiKey = getApiKey();

  // If no API key, return enhanced fallback
  if (!apiKey) {
    console.log("[AI] No Kimi API key found, using enhanced fallback generation");
    return generateEnhancedFallback(scrapedData, industryName);
  }

  try {
    const prompt = `You are a professional copywriter. Generate compelling website content for a ${industryName} business.

BUSINESS INFO:
- Name: ${scrapedData.businessName || "Unknown"}
- Description: ${scrapedData.description || ""}
- Services: ${scrapedData.services.join(", ") || "general services"}
- Phone: ${scrapedData.phone || ""}
- Email: ${scrapedData.email || ""}
- Address: ${scrapedData.address || ""}
- Hours: ${scrapedData.hours || ""}
- Raw page content: ${scrapedData.rawText?.slice(0, 1000) || ""}

Generate a JSON object with these exact keys:
{
  "businessName": "the business name",
  "tagline": "a catchy 6-10 word tagline",
  "description": "a compelling 2-3 sentence business description",
  "heroHeadline": "an attention-grabbing headline for the hero section (max 8 words)",
  "heroSubtext": "supporting text under the headline (1-2 sentences)",
  "aboutText": "2-3 sentences about the business for an About section",
  "services": ["Service 1", "Service 2", "Service 3", "Service 4", "Service 5", "Service 6"],
  "testimonials": [
    {"name": "Customer Name", "text": "Short testimonial quote"},
    {"name": "Customer Name", "text": "Short testimonial quote"},
    {"name": "Customer Name", "text": "Short testimonial quote"}
  ],
  "ctaText": "call-to-action button text (2-4 words)",
  "seoTitle": "SEO-optimized page title (50-60 chars)",
  "seoDescription": "SEO meta description (150-160 chars)"
}

Respond ONLY with the JSON object, no markdown formatting, no code blocks.`;

    const response = await fetch(KIMI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: KIMI_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a professional website copywriter who creates compelling, conversion-optimized content for small business websites. You always respond with valid JSON only.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.warn(`[AI] Kimi API returned ${response.status}, using fallback`);
      return generateEnhancedFallback(scrapedData, industryName);
    }

    const result = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = result.choices?.[0]?.message?.content;
    if (!content) {
      return generateEnhancedFallback(scrapedData, industryName);
    }

    // Parse JSON from response
    const jsonStr = content.replace(/```json\n?|\n?```/g, "").trim();
    const aiData = JSON.parse(jsonStr) as Record<string, any>;

    return {
      businessName: aiData.businessName || scrapedData.businessName || "Your Business",
      tagline: aiData.tagline || scrapedData.description?.slice(0, 100) || "",
      description: aiData.description || scrapedData.description || "",
      services: Array.isArray(aiData.services) ? aiData.services : scrapedData.services,
      phone: scrapedData.phone || "(555) 000-0000",
      email: scrapedData.email || "",
      address: scrapedData.address || "",
      hours: scrapedData.hours || "Mon-Fri: 9:00 AM - 5:00 PM",
      heroHeadline: aiData.heroHeadline || aiData.tagline || "Welcome",
      heroSubtext: aiData.heroSubtext || aiData.description || "",
      aboutText: aiData.aboutText || aiData.description || "",
      testimonials: Array.isArray(aiData.testimonials) ? aiData.testimonials : [],
      ctaText: aiData.ctaText || "Get Started",
      seoTitle: aiData.seoTitle || `${scrapedData.businessName} | ${industryName}`,
      seoDescription: aiData.seoDescription || scrapedData.description?.slice(0, 160) || "",
    };
  } catch (err: any) {
    console.error("[AI] Generation error:", err.message);
    return generateEnhancedFallback(scrapedData, industryName);
  }
}

function generateEnhancedFallback(
  scrapedData: {
    businessName: string;
    description: string;
    services: string[];
    phone: string;
    email: string;
    address: string;
    hours: string;
  },
  industryName: string,
): AIContent {
  const name = scrapedData.businessName || "Your Business";
  const desc =
    scrapedData.description ||
    `Welcome to ${name}, your trusted ${industryName.toLowerCase()}. We deliver exceptional quality and outstanding customer service.`;

  const industryServices: Record<string, string[]> = {
    default: ["Professional Service", "Consultation", "Custom Solutions", "Expert Support", "Quality Guarantee", "Fast Turnaround"],
    "Auto Repair Shop": ["Oil Change", "Brake Repair", "Engine Diagnostics", "Transmission Service", "AC Repair", "Tire Services"],
    "Plumbing": ["Emergency Plumbing", "Drain Cleaning", "Water Heater Repair", "Pipe Replacement", "Leak Detection", "Sewer Service"],
    "HVAC Services": ["AC Installation", "Heating Repair", "Duct Cleaning", "Maintenance Plans", "Emergency Service", "Air Quality"],
    "Restaurant": ["Dine-In", "Takeout", "Catering", "Private Events", "Daily Specials", "Online Ordering"],
    "Hair Salon": ["Haircuts", "Color & Highlights", "Styling", "Treatments", "Extensions", "Bridal"],
    "Yoga Studio": ["Vinyasa Flow", "Hot Yoga", "Meditation", "Private Sessions", "Beginner Classes", "Workshops"],
    "Dental Practice": ["Cleanings", "Whitening", "Crowns", "Implants", "Orthodontics", "Emergency Care"],
    "Gym": ["Personal Training", "Group Classes", "Strength Training", "Cardio", "Nutrition", "Swimming"],
    "Landscaping": ["Lawn Care", "Garden Design", "Tree Service", "Irrigation", "Hardscaping", "Seasonal Cleanup"],
  };

  const services = industryServices[industryName] || scrapedData.services || industryServices.default;

  return {
    businessName: name,
    tagline: desc.slice(0, 100),
    description: desc,
    services,
    phone: scrapedData.phone || "(555) 000-0000",
    email: scrapedData.email || `contact@${name.toLowerCase().replace(/\s/g, "")}.com`,
    address: scrapedData.address || "",
    hours: scrapedData.hours || "Mon-Fri: 9:00 AM - 5:00 PM",
    heroHeadline: `Trusted ${industryName} Services`,
    heroSubtext: desc.slice(0, 200),
    aboutText: `${name} has been serving the community with pride and dedication. ${desc}`,
    testimonials: [
      { name: "Michael R.", text: `Excellent service from ${name}. Highly professional and reliable!` },
      { name: "Sarah K.", text: `I have been using ${name} for years. Always exceeds expectations!` },
      { name: "David L.", text: `Fast, friendly, and fairly priced. ${name} is the best in the area.` },
    ],
    ctaText: "Get Started",
    seoTitle: `${name} | ${industryName} Services`,
    seoDescription: desc.slice(0, 160),
  };
}
