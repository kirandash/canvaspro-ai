import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
