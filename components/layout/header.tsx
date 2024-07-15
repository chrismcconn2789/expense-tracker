import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  InfoIcon,
  LayoutDashboardIcon,
  PlusIcon,
  PoundSterlingIcon,
  Table2Icon,
} from "lucide-react";
import Link from "next/link";
import { RxLockClosed, RxPerson } from "react-icons/rx";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/theme-switcher";

export default function Header() {
  const { userId } = auth();
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between">
        <Link href={"/"}>
          <div className="flex gap-4 items-center">
            <PoundSterlingIcon className="size-12 stroke-[3px] bg-black rounded-md text-white p-2 dark:text-black dark:bg-white" />
            <h1 className="font-bold text-2xl">Financial Analytics</h1>
          </div>
        </Link>
        <div className="flex gap-2 items-center">
          {!userId && (
            <div className="flex gap-2">
              <SignInButton>
                <Button variant="outline" className="flex gap-1">
                  <RxLockClosed className="size-5" />
                  Login
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="outline" className="flex gap-1">
                  <RxPerson className="size-5" /> Register
                </Button>
              </SignUpButton>
            </div>
          )}
          {userId && (
            <div className="flex gap-2">
              <UserButton
                showName={true}
                appearance={{
                  elements: {
                    userButtonBox:
                      "dark:text-white border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md",
                    userButtonAvatarBox: "hidden",
                  },
                }}
              />
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
      <hr />
      {userId && (
        <div>
          <nav>
            <ul className="flex gap-2 flex-wrap">
              <Link href={"/"}>
                <li className="flex gap-1 border rounded-md py-1 px-3 items-center">
                  <LayoutDashboardIcon className="size-5" />
                  Dashboard
                </li>
              </Link>
              <Link href={"/overview"}>
                <li className="flex gap-1 border rounded-md py-1 px-3 items-center">
                  <Table2Icon className="size-5" />
                  Overview
                </li>
              </Link>
              <Link href={"/create-expense"}>
                <li className="flex gap-1 border rounded-md py-1 px-3 items-center">
                  <PlusIcon className="size-5" />
                  Create
                </li>
              </Link>
              <Link href={"/about"}>
                <li className="flex gap-1 border rounded-md py-1 px-3 items-center">
                  <InfoIcon className="size-5" />
                  About
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
