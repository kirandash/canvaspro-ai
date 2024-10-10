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
import { useRegister } from "@/features/auth/api/use-register";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/features/editor/constants";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { TfiEmail } from "react-icons/tfi";

export default function RegisterCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useRegister();

  const onCredentialsRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutateAsync({ name, email, password }).then(() => {
      // Sign in the user after registration
      signIn("credentials", {
        email,
        password,
        redirectTo: "/",
      });
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>We’ll create an account for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <form
            onSubmit={onCredentialsRegister}
            className="flex space-y-4 flex-col"
          >
            <div className="flex space-y-2 flex-col">
              <Label>Full Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="p-2 border border-gray-300 rounded"
                disabled={mutation.isPending}
              />
            </div>
            <div className="flex space-y-2 flex-col">
              <Label>Email (personal or work)</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-2 border border-gray-300 rounded"
                disabled={mutation.isPending}
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
                disabled={mutation.isPending}
              />
            </div>
            <Button
              type="submit"
              className="flex gap-1 w-full relative"
              variant={"outline"}
              disabled={mutation.isPending}
            >
              <TfiEmail className="top-1/2 -translate-y-1/2 left-2 absolute" />
              Register with Email
            </Button>
            {mutation.error && <ErrorAlert text={mutation.error.message} />}
          </form>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <p className="text-muted-foreground text-xs">
          Already registered?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
