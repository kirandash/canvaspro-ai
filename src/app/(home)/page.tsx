import HomeBanner from "@/app/(home)/home-banner";
import RecentDesigns from "@/app/(home)/recent-designs";
import { protectRoute } from "@/features/auth/utils";

export default async function Home() {
  await protectRoute();
  return (
    <div className="flex flex-col space-y-4 mx-auto pb-10">
      <HomeBanner />
      <RecentDesigns />
    </div>
  );
}
