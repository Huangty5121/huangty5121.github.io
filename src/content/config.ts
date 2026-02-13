import { defineCollection, z } from 'astro:content';

/* ── Projects Collection ── */
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slogan: z.string(),
    cover: z.string(),
    techStack: z.array(z.string()),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    priority: z.number().default(0),
  }),
});

/* ── Blog Collection ── */
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    channel: z.enum(['frequency', 'noise']).default('frequency'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    readingTime: z.number().optional(),
  }),
});

export const collections = { projects, blog };
