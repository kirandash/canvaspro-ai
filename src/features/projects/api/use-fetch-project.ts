import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type FetchProjectResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$get"],
  // 200 is to make sure the response type contains only the success response type
  200
>;

export const useFetchProject = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["project", { id }],
    queryFn: async () => {
      // Note: can not use try catch here since it's not a fetch function
      const res = await client.api.projects[":id"].$get({
        param: { id },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch project");
      }

      const { data } = await res.json();
      return data;
    },
  });

  return query;
};
