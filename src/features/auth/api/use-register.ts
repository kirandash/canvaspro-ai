import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<
  (typeof client.api.register)["$post"]
>["json"];
type ResponseType = InferResponseType<(typeof client.api.register)["$post"]>;

export const useRegister = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const res = await client.api.register.$post({
        json: data,
      });

      if (!res.ok) {
        throw new Error("Failed to register user");
      }

      return await res.json();
    },
    onError: () => {
      // No need of toast as we are handling this in register-card
      // toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("User registered successfully");
    },
  });

  return mutation;
};
