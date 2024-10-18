import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<
  (typeof client.api.projects)[":id"]["$patch"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$patch"],
  200
>;

export const usePatchProject = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["project", { id }],
    mutationFn: async (data) => {
      const res = await client.api.projects[":id"].$patch({
        json: data,
        param: { id },
      });

      if (!res.ok) {
        throw new Error("Failed to update project");
      }

      return await res.json();
    },
    onError: () => {
      toast.error("Failed to update project");
    },
    onSuccess: () => {
      // toast.success("Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["project", { id }] });
    },
  });

  return mutation;
};
