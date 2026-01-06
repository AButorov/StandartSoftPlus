import { defineCollection, z } from "astro:content";

const jobsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    details: z.string(),
    tags: z.array(z.string()),
    client: z.string(),
    stack: z.string(),
    status: z.string(),
    features: z.array(z.string()),
    order: z.number(),
    pubDate: z.string().optional(),
  }),
});

export const collections = {
  jobs: jobsCollection,
};
