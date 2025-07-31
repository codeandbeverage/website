import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const newsletter = defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/newsletter' }),
    schema: z.object({
        date: z.string(),
        content: z.array(z.object({
            title: z.string(),
            description: z.string(),
            link: z.string().url(),
            image: z.string(),
            duration: z.string(),
        })),
    })
});

export const collections = {
    newsletter,
}