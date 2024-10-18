import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

// type RequestType = InferRequestType<
//   (typeof client.api.subscriptions)["checkout"]["$post"]
// >;
type ResponseType = InferResponseType<
  (typeof client.api.subscriptions)["billing-portal"]["$post"],
  200
>;

export const useBillingPortal = () => {
  // if RequestType is mentioned then you need to pass empty object as we don't have any json body
  // const mutation = useMutation<ResponseType, Error, RequestType>({
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const res = await client.api.subscriptions["billing-portal"].$post();

      if (!res.ok) {
        throw new Error("Failed to create session");
      }

      return await res.json();
    },
    onError: () => {
      toast.error("Failed to create session");
    },
    onSuccess: ({ data }) => {
      window.location.href = data;
    },
  });

  return mutation;
};
