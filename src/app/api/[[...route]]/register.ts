import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/features/editor/constants";
import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
    })
  ),
  async (c) => {
    const { name, email, password } = c.req.valid("json");

    // 10 is the salt length for the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = await db.select().from(users).where(eq(users.email, email));

    if (query.length > 0) {
      return c.json({ message: "User already exists" }, 400);
    }

    // Insert the user into the database under users table with the hashed password
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    // return c.json({ message: "User created" }, 200);
    return c.json(null, 200);
  }
);

export default app;
