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
import Link from "next/link";
import { TfiEmail } from "react-icons/tfi";

export default function RegisterCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>We’ll create an account for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
