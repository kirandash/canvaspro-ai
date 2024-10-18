import RecentTemplates from "@/app/templates/recent-templates";
import { protectRoute } from "@/features/auth/utils";

export default async function Templates() {
  await protectRoute();
  return (
    <div className="flex flex-col space-y-4 mx-auto pb-10">
      <RecentTemplates />
    </div>
  );
}
