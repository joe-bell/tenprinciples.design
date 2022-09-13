import type { APIRoute } from "astro";
import { config } from "../config";

export const get: APIRoute = () => ({
  body: JSON.stringify({
    name: config.title,
    short_name: config.title,
    start_url: "/",
    display: "minimal-ui",
    icons: [
      { src: "/favicon@192px.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon@512px.png", sizes: "512x512", type: "image/png" },
    ],
  }),
});
