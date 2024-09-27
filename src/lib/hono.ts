import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

export const client = hc<AppType>(apiUrl);
