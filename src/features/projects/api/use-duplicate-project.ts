import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<
  (typeof client.api.projects)[":id"]["duplicate"]["$post"]
>["param"];
type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["duplicate"]["$post"],
  200
>;

export const useDuplicateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    // Tip: We are using param to get access to id instead of passing it from the `useDuplicateProject` function params
    mutationFn: async (param) => {
      const res = await client.api.projects[":id"]["duplicate"].$post({
        param,
      });

      if (!res.ok) {
        throw new Error("Failed to copy project");
      }

      return await res.json();
    },
    onError: () => {
      toast.error("Failed to copy project");
    },
    onSuccess: () => {
      // toast.success("Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return mutation;
};
