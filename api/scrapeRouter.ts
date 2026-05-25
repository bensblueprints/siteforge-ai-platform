import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { scrapeWithPlaywright } from "./services/scraper";
import { generateContentWithAI } from "./services/ai";
import { getDb } from "./queries/connection";
import { projects } from "@db/schema";
import { eq } from "drizzle-orm";

export const scrapeRouter = createRouter({
  // Scrape a URL and return raw data
  scrape: publicQuery
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input }) => {
      console.log(`[tRPC] scrape called for: ${input.url}`);
      const data = await scrapeWithPlaywright(input.url);
      return data;
    }),

  // Generate AI content from scraped data
  generate: publicQuery
    .input(
      z.object({
        scrapedData: z.object({
          businessName: z.string(),
          description: z.string(),
          services: z.array(z.string()),
          phone: z.string(),
          email: z.string(),
          address: z.string(),
          hours: z.string(),
          rawText: z.string(),
        }),
        industryName: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      console.log(`[tRPC] generate called for: ${input.industryName}`);
      const content = await generateContentWithAI(input.scrapedData, input.industryName);
      return content;
    }),

  // Full pipeline: scrape + generate + save project
  build: publicQuery
    .input(
      z.object({
        url: z.string().url(),
        inputType: z.enum(["maps", "website"]),
        industryId: z.string(),
        industryName: z.string(),
        industryColor: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      console.log(`[tRPC] build pipeline for: ${input.url}`);

      // Step 1: Scrape
      const scraped = await scrapeWithPlaywright(input.url);

      // Step 2: Generate AI content
      const aiContent = await generateContentWithAI(
        {
          businessName: scraped.businessName,
          description: scraped.description,
          services: scraped.services,
          phone: scraped.phone,
          email: scraped.email,
          address: scraped.address,
          hours: scraped.hours,
          rawText: scraped.rawText,
        },
        input.industryName,
      );

      // Step 3: Build default sections
      const sectionTypes = getIndustrySections(input.industryId);
      const sections = sectionTypes.map((type, i) => ({
        id: `${type}-${Date.now()}-${i}`,
        type,
        name: type.charAt(0).toUpperCase() + type.slice(1),
        enabled: true,
        order: i,
      }));

      // Step 4: Save to database
      const slug = `proj-${Date.now()}`;
      const projectData = {
        slug,
        name: aiContent.businessName,
        industry: input.industryName,
        industryId: input.industryId,
        status: "ready" as const,
        inputUrl: input.url,
        inputType: input.inputType,
        businessName: aiContent.businessName,
        tagline: aiContent.tagline,
        description: aiContent.description,
        phone: aiContent.phone,
        email: aiContent.email,
        address: aiContent.address,
        hours: aiContent.hours,
        rating: scraped.rating || "4.8",
        reviewCount: scraped.reviewCount || "150",
        services: aiContent.services,
        primaryColor: input.industryColor || "#6b46c1",
        secondaryColor: "#2563eb",
        accentColor: "#a78bfa",
        fontFamily: "Inter",
        sections,
        rawText: scraped.rawText?.slice(0, 2000),
      };

      const [result] = await getDb().insert(projects).values(projectData).$returningId();
      const savedProject = await getDb()
        .select()
        .from(projects)
        .where(eq(projects.id, result.id))
        .limit(1);

      return {
        project: savedProject[0],
        scraped,
        aiContent,
      };
    }),

  // Get a project by ID
  getProject: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const rows = await getDb()
        .select()
        .from(projects)
        .where(eq(projects.id, input.id))
        .limit(1);
      return rows[0] || null;
    }),

  // List all projects
  listProjects: publicQuery.query(async () => {
    return getDb().select().from(projects).orderBy(projects.createdAt);
  }),

  // Update project
  updateProject: publicQuery
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          name: z.string().optional(),
          businessName: z.string().optional(),
          tagline: z.string().optional(),
          description: z.string().optional(),
          phone: z.string().optional(),
          email: z.string().optional(),
          address: z.string().optional(),
          hours: z.string().optional(),
          services: z.array(z.string()).optional(),
          primaryColor: z.string().optional(),
          secondaryColor: z.string().optional(),
          accentColor: z.string().optional(),
          fontFamily: z.string().optional(),
          sections: z.array(z.any()).optional(),
          status: z.string().optional(),
        }).passthrough(),
      }),
    )
    .mutation(async ({ input }) => {
      await getDb()
        .update(projects)
        .set({ ...input.data, updatedAt: new Date() })
        .where(eq(projects.id, input.id));
      const rows = await getDb()
        .select()
        .from(projects)
        .where(eq(projects.id, input.id))
        .limit(1);
      return rows[0];
    }),

  // Delete project
  deleteProject: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getDb().delete(projects).where(eq(projects.id, input.id));
      return { success: true };
    }),
});

function getIndustrySections(industryId: string): string[] {
  const sectionMap: Record<string, string[]> = {
    default: ["hero", "services", "about", "testimonials", "contact"],
    restaurant: ["hero", "services", "gallery", "testimonials", "contact"],
    cafe: ["hero", "services", "gallery", "testimonials", "contact"],
    gym: ["hero", "services", "team", "testimonials", "contact"],
    yoga: ["hero", "about", "services", "testimonials", "contact"],
    dental: ["hero", "services", "about", "testimonials", "contact"],
    "hair-salon": ["hero", "services", "gallery", "testimonials", "contact"],
    "auto-repair": ["hero", "services", "about", "testimonials", "contact"],
  };
  return sectionMap[industryId] || sectionMap.default;
}
