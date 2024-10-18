import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<
  (typeof client.api.projects)["$post"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.projects)["$post"],
  200
>;

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const res = await client.api.projects.$post({
        json: data,
      });

      if (!res.ok) {
        throw new Error("Failed to create project");
      }

      return await res.json();
    },
    onError: () => {
      toast.error("Failed to create project");
    },
    onSuccess: () => {
      toast.success("Project created successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return mutation;
};
