import { auth } from "@/auth";
import { redirect } from "next/navigation";

// This function is used to protect the server-side route
export const protectRoute = async () => {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
};
