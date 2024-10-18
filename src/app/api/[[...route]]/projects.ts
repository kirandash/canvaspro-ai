import { db } from "@/db/drizzle";
import { insertProjectSchema, projects } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, asc, desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

// Chain all routes from the hono instance for the RPC architecture to work
const app = new Hono()
  .get(
    "/templates",
    verifyAuth(),
    zValidator(
      "query",
      z.object({ page: z.coerce.number(), limit: z.coerce.number() })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { page = 1, limit = 10 } = c.req.valid("query");

      if (!auth.token?.id || typeof auth.token.id !== "string") {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.isTemplate, true))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(asc(projects.isPremium), desc(projects.updatedAt));

      return c.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    }
  )
  .get(
    "/",
    verifyAuth(),
    zValidator(
      "query",
      z.object({ page: z.coerce.number(), limit: z.coerce.number() })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { page = 1, limit = 10 } = c.req.valid("query");

      if (!auth.token?.id || typeof auth.token.id !== "string") {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, auth.token.id))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.updatedAt));

      return c.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    }
  )
  .patch(
    "/:id",
    verifyAuth(),
    // param validator
    zValidator("param", z.object({ id: z.string() })),
    // body validator
    zValidator(
      "json",
      insertProjectSchema
        .omit({
          id: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        })
        .partial()
    ),
    async (c) => {
      // simulate error
      // return c.json({ error: "something went wrong" }, 400);
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      console.log("values", values);

      if (!auth.token?.id || typeof auth.token.id !== "string") {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .update(projects)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
        .returning();

      if (data.length === 0) {
        return c.json({ error: "Failed to update project" }, 500);
      }

      return c.json({ data: data[0] });
    }
  )
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
  .get(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id || typeof auth.token.id !== "string") {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // This will always return an array of projects
      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

      if (data?.length === 0) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data: data[0] });
    }
  )
  .post(
    "/:id/duplicate",
    verifyAuth(),
    // param validator
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id || typeof auth.token.id !== "string") {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Fetch project that needs to be duplicated
      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

      if (data?.length === 0) {
        return c.json({ error: "Not found" }, 404);
      }

      const project = data[0];

      // Insert the project with the same data but different id
      const duplicatedData = await db
        .insert(projects)
        .values({
          ...project,
          name: `Copy of ${project.name}`,
          id: undefined,
          userId: auth.token.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (duplicatedData.length === 0) {
        return c.json({ error: "Failed to duplicate project" }, 500);
      }

      return c.json({ data: duplicatedData[0] });
    }
  )
  .delete(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id || typeof auth.token.id !== "string") {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .delete(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
        .returning();

      if (data.length === 0) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data: { id, name: data[0].name } });
    }
  );
export default app;
