import { auth } from "@/auth";
import LogInCard from "@/features/auth/components/login-card";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <LogInCard />;
};

export default LoginPage;
