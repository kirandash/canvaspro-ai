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
import ErrorAlert from "@/components/ui/error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/features/editor/constants";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";

export default function LogInCard() {
  const onOAuthProviderLogin = async (provider: "github" | "google") => {
    // redirectTo can be used to override the default redirect behavior of the provider. It is optional.
    signIn(provider, { redirectTo: "/" });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const params = useSearchParams();
  const error = params.get("error");

  const onCredentialsLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
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
            onClick={() => onOAuthProviderLogin("github")}
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
            onClick={() => onOAuthProviderLogin("google")}
            className="flex gap-1 w-full relative"
            variant={"outline"}
          >
            <FcGoogle className="top-1/2 -translate-y-1/2 left-2 absolute" />
            Log in with Google
          </Button>
          {/* </form> */}
          <Separator />
          <form
            onSubmit={onCredentialsLogin}
            className="flex space-y-4 flex-col"
          >
            <div className="flex space-y-2 flex-col">
              <Label>Email (personal or work)</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex space-y-2 flex-col">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-2 border border-gray-300 rounded"
                minLength={PASSWORD_MIN_LENGTH}
                maxLength={PASSWORD_MAX_LENGTH}
              />
            </div>
            <Button
              type="submit"
              className="flex gap-1 w-full relative"
              variant={"outline"}
            >
              <TfiEmail className="top-1/2 -translate-y-1/2 left-2 absolute" />
              Log in with Email
            </Button>
            {error === "CredentialsSignin" && (
              <ErrorAlert text="Invalid email or password" />
            )}
          </form>
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
