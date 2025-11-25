import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const principles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/principles" }),
});

export const collections = {
  principles,
};
