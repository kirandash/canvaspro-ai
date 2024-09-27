import Replicate from "replicate";

const replicateAPIToken = process.env.REPLICATE_API_TOKEN;
if (!replicateAPIToken) {
  throw new Error("REPLICATE_API_TOKEN is required");
}

// replicate client
export const replicate = new Replicate({
  auth: replicateAPIToken,
});
