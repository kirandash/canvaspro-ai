import { Hono } from "hono";
import { handle } from "hono/vercel";

// This indicates runtime of the api
export const runtime = "edge";
// This will make the api run on nodejs runtime and hence not dependent on vercel
// export const runtime = "nodejs";

// Create a new Hono instance with base path as /api
const app = new Hono().basePath("/api");

// Routes
app.get("/hello", (c) => {
  // c: Context
  return c.json({
    message: "Hello Next.js!",
  });
});

app.get("/hello2", (c) => {
  return c.json({
    message: "Hello Next.js 2!",
  });
});

// Use handle to export the routes
// Hono overwrites the default export of the file
export const GET = handle(app);
export const POST = handle(app);
