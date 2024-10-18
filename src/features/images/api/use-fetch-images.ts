import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useFetchImages = () => {
  const query = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      // Note: can not use try catch here since it's not a fetch function
      const res = await client.api.images.$get();

      if (!res.ok) {
        throw new Error("Failed to fetch images");
      }

      const { data } = await res.json();
      return data;
    },
  });

  return query;
};
