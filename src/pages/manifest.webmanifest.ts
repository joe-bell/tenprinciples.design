import type { APIRoute } from "astro";
import { config } from "@/config";

export const GET: APIRoute = async () =>
  new Response(
    JSON.stringify(
      {
        name: config.title,
        short_name: config.title,
        start_url: "/",
        display: "minimal-ui",
        icons: [
          { src: "/favicon@192px.png", sizes: "192x192", type: "image/png" },
          { src: "/favicon@512px.png", sizes: "512x512", type: "image/png" },
        ],
      },
      null,
      2,
    ),
    {
      headers: {
        "content-type": "application/json",
      },
      status: 200,
    },
  );
