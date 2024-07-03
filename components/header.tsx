import {
  InfoIcon,
  LayoutDashboardIcon,
  PlusIcon,
  PoundSterlingIcon,
  Table2Icon,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ui/theme-switcher";

export default function Header() {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <PoundSterlingIcon className="size-10 stroke-[3px] bg-black rounded-md text-white p-2 dark:text-black dark:bg-white" />
          <h1 className="font-bold text-2xl">Financial Analytics</h1>
        </div>
        <ModeToggle />
      </div>
      <hr />
      <div>
        <nav>
          <ul className="flex gap-2 ">
            <Link href={"/"}>
              <li className="flex gap-1 border rounded-md py-1 px-3 items-center">
                <LayoutDashboardIcon className="size-5" />
                Dashboard
              </li>
            </Link>
            <Link href={"/create-expense"}>
              <li className="flex gap-1 border rounded-md py-1 px-3 items-center">
                <PlusIcon className="size-5" />
                Create Transaction
              </li>
            </Link>
            <Link href={"/overview"}>
              <li className="flex gap-1 border rounded-md py-1 px-3 items-center">
                <Table2Icon className="size-5" />
                Overview
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
    </div>
  );
}
