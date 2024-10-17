import { replicate } from "@/lib/replicate";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .post(
    "/remove-background",
    zValidator(
      "json",
      z.object({
        image: z.string(),
      })
    ),
    verifyAuth(),
    async (c) => {
      const { image } = c.req.valid("json");

      const output: unknown = await replicate.run(
        "lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1",
        {
          input: {
            image,
          },
        }
      );

      const res = output as string;

      return c.json({ data: res });
    }
  )
  .post(
    "/generate-image",
    zValidator(
      "json",
      z.object({
        prompt: z.string(),
      })
    ),
    verifyAuth(),
    async (c) => {
      const { prompt } = c.req.valid("json");

      const output = await replicate.run(
        "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
        {
          input: {
            width: 1024,
            height: 1024,
            prompt,
            scheduler: "K_EULER",
            num_outputs: 1,
            guidance_scale: 0,
            negative_prompt: "worst quality, low quality",
            num_inference_steps: 4,
          },
        }
      );

      const res = output as Array<string>;

      return c.json({ data: res[0] });
    }
  );

export default app;
