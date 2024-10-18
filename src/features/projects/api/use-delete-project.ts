import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<
  (typeof client.api.projects)[":id"]["$delete"]
>["param"];
type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$delete"],
  200
>;

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    // Tip: We are using param to get access to id instead of passing it from the `useDeleteProject` function params
    mutationFn: async (param) => {
      const res = await client.api.projects[":id"].$delete({
        param,
      });

      if (!res.ok) {
        throw new Error("Failed to delete project");
      }

      return await res.json();
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
    // data is the response from the server or the hono api
    onSuccess: ({ data }) => {
      // toast.success("Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", { id: data.id }] });
    },
  });

  return mutation;
};
