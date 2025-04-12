import { ChefHat } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function DesktopNavbar() {
  const pathName = usePathname();

  return (
    <nav className="hidden lg:max-w-7xl lg:mx-auto px-4 lg:flex lg:items-center lg:justify-between">
      <Link
        href="/"
        className={`${
          pathName === "/login" || pathName === "/signup"
            ? "text-primary-foreground"
            : "text-primary"
        } flex gap-1 items-center`}
      >
        <ChefHat className="h-5 w-5" />
        <p className="text-2xl font-semibold">Culinary Art</p>
      </Link>

      <div className="flex gap-4 text-md font-medium">
        <Link
          href="/"
          className="hover:text-primary transition-all duration-300"
        >
          Recipes
        </Link>
        <Link
          href="/"
          className="hover:text-primary transition-all duration-300"
        >
          Shop Item
        </Link>
        <Link
          href="/"
          className="hover:text-primary transition-all duration-300"
        >
          Upload Recipe
        </Link>
        <Link
          href="/about"
          className="hover:text-primary transition-all duration-300"
        >
          About Us
        </Link>
      </div>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>

        <Button variant={"outline"} asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </nav>
  );
}
