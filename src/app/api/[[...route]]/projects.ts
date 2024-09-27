import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

// Chain all routes from the hono instance for the RPC architecture to work
const app = new Hono()
  .get("/", (c) => {
    // if (true) {
    //   return c.json({ error: "something went wrong" }, 400);
    // }
    return c.json("list projects");
  })
  .post(
    "/",
    zValidator(
      "form",
      z.object({
        body: z.number(),
      })
    ),
    (c) => {
      const validated = c.req.valid("form");
      return c.json({
        message: `create project with body ${validated.body}`,
      });
    }
  )
  .get("/:id", (c) => c.json(`get project ${c.req.param("id")}`));

export default app;
