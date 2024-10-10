import { protectRoute } from "@/features/auth/utils";

export default async function Home() {
  await protectRoute();
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page</p>
    </div>
  );
}
