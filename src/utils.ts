import { config } from "@/config";

export function isProduction(url: URL) {
  return url.origin === config.site;
}
