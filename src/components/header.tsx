"use client";
import ModeToggle from "./mode-toggle";
import Link from "next/link";

export const navItems = [
  {
    label: "Project",
    href: "/projects",
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 w-full z-50 bg-background/90">
      <div className="container h-14 grid grid-cols-2 items-center justify-between">
        <div className="flex justify-start">
          <Link href={"/"} className="font-bold text-xl">
            samurun
          </Link>
        </div>
        <div className="flex justify-end">
          <nav className="flex items-center gap-4">
            <Link
              href={"/activities"}
              className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200"
            >
              Activities
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
