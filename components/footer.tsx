import { GlobeIcon } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="static bottom-0 mt-8 w-full flex flex-col gap-4 items-center">
      <hr className=" w-full" />
      <div className=" flex justify-between w-full px-4">
        <div className="flex gap-4">
          <Link href="https://github.com/chrismcconn2789" target="_blank">
            <SiGithub className="size-6" />
          </Link>
          <Link href="https://linkedin.com/in/cmcconnell89" target="_blank">
            <SiLinkedin className="size-6" />
          </Link>
          <Link href="https://chrismcconnell.dev" target="_blank">
            <GlobeIcon className="size-6" />
          </Link>
        </div>
        Chris McConnell &copy; {year}
      </div>
    </div>
  );
}
