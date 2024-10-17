import { verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";

const app = new Hono().get("/", verifyAuth(), async (c) => {
  const auth = c.get("authUser");
  // if (!auth) {
  //   return c.json({ error: "Unauthorized" }, 401);
  // }
  return c.json(auth);
});

export default app;
