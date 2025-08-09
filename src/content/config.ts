import { defineCollection, z } from 'astro:content';

export const collections = {
  kethaven: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.string(),
      category: z.string(),
      vetharen: z.string()
    })
  })
};