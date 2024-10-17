import { db } from "@/db/drizzle";
import { insertProjectSchema, projects } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

// Chain all routes from the hono instance for the RPC architecture to work
const app = new Hono()
  .get("/", verifyAuth(), (c) => {
    // if (true) {
    //   return c.json({ error: "something went wrong" }, 400);
    // }
    return c.json("list projects");
  })
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      insertProjectSchema.pick({
        name: true,
        json: true,
        height: true,
        width: true,
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { name, json, height, width } = c.req.valid("json");

      if (!auth.token?.id || typeof auth.token.id !== "string") {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .insert(projects)
        .values({
          name,
          json,
          height,
          width,
          userId: auth.token.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (data.length === 0) {
        return c.json({ error: "Failed to create project" }, 500);
      }

      return c.json({ data: data[0] });
    }
  )
  .get("/:id", verifyAuth(), (c) => c.json(`get project ${c.req.param("id")}`));

export default app;
