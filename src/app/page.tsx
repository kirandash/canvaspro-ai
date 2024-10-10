import { auth } from "@/auth";
import { protectRoute } from "@/features/auth/utils";

export default async function Home() {
  await protectRoute();
  const session = await auth();
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page</p>
      {JSON.stringify(session, null, 2)}
    </div>
  );
}
