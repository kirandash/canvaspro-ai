import { auth } from "@/auth";
import RegisterCard from "@/features/auth/components/register-card";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <RegisterCard />;
};

export default RegisterPage;
