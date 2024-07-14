"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function SignInButton() {
  const router = useRouter();
  return (
    <Button variant="default" onClick={() => router.push("/sign-in")}>
      Sign In
    </Button>
  );
}
