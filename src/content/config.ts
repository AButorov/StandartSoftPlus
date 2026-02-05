import { defineCollection, z } from "astro:content";

// Коллекция для портфолио/проектов
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

// Коллекция для услуг
const servicesCollection = defineCollection({
  type: "data",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    icon: z.string(),
    description: z.string(),
    features: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = {
  jobs: jobsCollection,
  services: servicesCollection,  // ← ДОБАВИЛИ
};
