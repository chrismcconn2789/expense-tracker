import NeonIcon from "@/components/icons/neon";
import { Card } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import { TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SiClerk, SiNextdotjs, SiPrisma, SiTailwindcss } from "react-icons/si";

export default function About() {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return (
    <div className="flex flex-col gap-4 justify-around">
      <div className="w-full flex justify-center">
        <Card className="flex gap-1 items-center p-2 border-red-500 w-fit">
          <TriangleAlertIcon className="text-red-500 size-6" />
          <span className="text-red-500">This is a demo application.</span>
          <span className="text-red-500">
            Do not enter real financial information
          </span>
        </Card>
      </div>
      <p className="mx-8 text-balance text-center">
        This is a demo application built using Next.js with the latest server
        actions. It uses Primsa ORM and Neon Postgres Database for persistent
        storage. Clerk for authorization and Tailwind CSS with components from
        shadcn/ui for styling.
      </p>
      <p className="mx-8 text-center">Click on the icons below to learn more</p>
      <div className="flex gap-4 self-center">
        <Link href="https://nextjs.org/" target="_blank">
          <Card className="p-3">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <SiNextdotjs className="size-8" />
              Next.js
            </div>
          </Card>
        </Link>
        <Link href="https://www.prisma.io/" target="_blank">
          <Card className="p-3">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <SiPrisma className="size-8" />
              Prisma
            </div>
          </Card>
        </Link>
        <Link href="https://neon.tech" target="_blank">
          <Card className="p-3">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <NeonIcon />
              Neon
            </div>
          </Card>
        </Link>
        <Link href="https://clerk.com/" target="_blank">
          <Card className="p-3">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <SiClerk className="size-8 text-[#654BF6]" />
              Clerk
            </div>
          </Card>
        </Link>
        <Link href="https://tailwindcss.com/" target="_blank">
          <Card className="p-3">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <SiTailwindcss className="size-8 text-[#38BDF9]" />
              Tailwind
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
