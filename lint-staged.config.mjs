const config = {
  "**/*": (filenames) => [
    `pnpm prettier --write ${filenames
      .map((filename) => `'${filename}'`)
      .join(" ")}`,
  ],
  "*.{astro,md,mdx,html,cjs,mjs,js,jsx,svelte,ts,tsx,vue}": () => "astro check",
  "wrangler.jsonc": () => "pnpm wrangler types",
};

export default config;
