import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { config } from "./src/config";

export default defineConfig({
  site: config.site,
  output: "static",
  adapter: cloudflare(),
});
