import replicateai from "@/app/api/[[...route]]/replicateai";
import authConfig from "@/auth.config";
import { AuthConfig } from "@auth/core";
import { initAuthConfig } from "@hono/auth-js";
import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import images from "./images";
import projects from "./projects";
import register from "./register";
import test from "./test";

// This indicates runtime of the api
// 🚨 TODO: bcryptjs is not working on edge run time. See if it can be fixed
// export const runtime = "edge";
// This will make the api run on nodejs runtime and hence not dependent on vercel
export const runtime = "nodejs";

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig,
  };
}

// Create a new Hono instance with base path as /api
const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

// Routes
app.get("/hello", (c) => {
  // c: Context
  return c.json({
    message: "Hello Next.js!",
  });
});

const route = app
  .route("/images", images)
  .route("/test", test)
  .route("/replicate", replicateai)
  .route("/projects", projects)
  .route("/register", register);

// Use handle to export the routes
// Hono overwrites the default export of the file
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof route;
