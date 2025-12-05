import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const headers = new Headers(request.headers);
  headers.delete("cookie");
  return fetch("https://plausible.io/api/event", {
    method: "POST",
    headers,
    body: request.body,
    // https://github.com/node-fetch/node-fetch/issues/1769
    // @ts-expect-error
    duplex: "half",
  });
};
