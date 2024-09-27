import { unsplash } from "@/lib/unsplash";
import { Hono } from "hono";

const IMAGES_COUNT = 12;
// Note: The collection Id is not the one in the URL
// const DEFAULT_UNSPLASH_COLLECTION_IDS = ["TykmNN8eavc"];

const app = new Hono().get("/", async (c) => {
  const images = await unsplash.photos.getRandom({
    count: IMAGES_COUNT,
    // collectionIds: DEFAULT_UNSPLASH_COLLECTION_IDS,
  });

  if (images.errors) {
    return c.json({ errors: images.errors }, 400);
  }

  // Standardize the response to always be an array
  let response = images.response;
  if (!Array.isArray(response)) {
    response = [response];
  }

  return c.json({
    data: {
      images: response,
    },
  });
});

export default app;
