import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/">
        <Image src="/logo.png" alt="CAIRG" height={75} width={75} className="mb-2" />
      </Link>
      <Link href="/blogs" className="text-sm sm:text-lg text-center sm:text-left group font-medium transition-colors hover:text-primary">
        Reading Group Blog
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 bg-primary"></span>
      </Link>
      {/* <Link href="/builder" className="text-sm sm:text-lg text-center sm:text-left group font-medium transition-colors hover:text-highlight">
        Lessons
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 bg-highlight"></span>
      </Link> */}
    </nav>
  );
}
