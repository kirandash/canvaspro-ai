import LogOutCard from "@/features/auth/components/logout-card";
import { protectRoute } from "@/features/auth/utils";

// 🚨 TODO: Delete this page. As it is temporary for now. In future, we will logout using logout button on navbar
const LogoutPage = async () => {
  await protectRoute();

  return <LogOutCard />;
};

export default LogoutPage;
