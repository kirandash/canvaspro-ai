import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<
  (typeof client.api.replicate)["remove-background"]["$post"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.replicate)["remove-background"]["$post"]
>;

export const useRemoveBackground = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const res = await client.api.replicate["remove-background"].$post({
        json: data,
      });

      if (!res.ok) {
        throw new Error("Failed to remove background");
      }

      return await res.json();
    },
  });

  return mutation;
};
