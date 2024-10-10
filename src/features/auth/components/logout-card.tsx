import { signOut } from "@/auth";

export default function LogOutCard() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Log out</button>
    </form>
  );
}
