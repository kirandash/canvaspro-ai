"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";

export default function LogInCard() {
  const onProviderLogin = async (provider: "github" | "google") => {
    // redirectTo can be used to override the default redirect behavior of the provider. It is optional.
    signIn(provider, { redirectTo: "/" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Log in or sign up in seconds</CardTitle>
        <CardDescription>
          Use your github account to continue with CanvasPro AI (it’s free)!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          > */}
          <Button
            // type="submit"
            className="flex gap-1 w-full relative"
            variant={"outline"}
            onClick={() => onProviderLogin("github")}
          >
            <FaGithub className="top-1/2 -translate-y-1/2 left-2 absolute" />
            Log in with GitHub
          </Button>
          {/* </form> */}
          {/* <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          > */}
          <Button
            // type="submit"
            onClick={() => onProviderLogin("google")}
            className="flex gap-1 w-full relative"
            variant={"outline"}
          >
            <FcGoogle className="top-1/2 -translate-y-1/2 left-2 absolute" />
            Log in with Google
          </Button>
          {/* </form> */}
          <Button
            type="submit"
            className="flex gap-1 w-full relative"
            variant={"outline"}
          >
            <TfiEmail className="top-1/2 -translate-y-1/2 left-2 absolute" />
            Log in with Email
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2">
        <p className="text-muted-foreground text-xs">
          Not registered?{" "}
          <Link href="/register" className="underline">
            Register
          </Link>
        </p>
        <div className="flex flex-col">
          <p className="text-muted-foreground text-xs">
            By continuing, you agree to CanvasPro AI&apos;s Terms of Use.
          </p>
          <p className="text-muted-foreground text-xs">
            Read our Privacy Policy.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
