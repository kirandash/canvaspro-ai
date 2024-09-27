import { createApi } from "unsplash-js";

const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
if (!accessKey) {
  throw new Error("NEXT_PUBLIC_UNSPLASH_ACCESS_KEY is not set");
}

export const unsplash = createApi({
  accessKey,
  fetch,
});
