import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useFetchSubscription = () => {
  const query = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await client.api.subscriptions.current.$get();

      if (!res.ok) {
        throw new Error("Failed to fetch subscription");
      }

      const { data } = await res.json();
      return data;
    },
  });

  return query;
};
