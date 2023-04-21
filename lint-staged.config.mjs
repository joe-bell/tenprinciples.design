const config = {
  "**/*": (filenames) => [
    `pnpm prettier --ignore-unknown --no-error-on-unmatched-pattern -w -- ${filenames
      .map((filename) => `'${filename}'`)
      .join(" ")}`,
  ],
  "*.astro": () => "pnpm astro check",
  "*.{astro,mdx,cjs,mjs,js,jsx,svelte,ts,tsx,vue}": () => "pnpm tsc",
};

export default config;
