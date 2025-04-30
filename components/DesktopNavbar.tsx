import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions";
import { JWTPayload } from "jose";
import { ChefHat, LogOut, Pencil, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function DesktopNavbar({
  userInfo,
}: {
  userInfo: JWTPayload | null;
}) {
  const pathName = usePathname();
  const router = useRouter();

  async function handleNavigation(link: string) {
    router.push(link);
  }

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <nav className="hidden lg:max-w-7xl lg:mx-auto px-4 lg:flex lg:items-center lg:justify-between">
      <Link
        href={pathName === "/" ? "#home" : "/"}
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
          href="/about"
          className="hover:text-primary transition-all duration-300"
        >
          About Us
        </Link>
      </div>

      {userInfo !== null ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage
                  src={
                    (userInfo?.imageUrl as string) ??
                    "https://github.com/shadcn.png"
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>
                  {(userInfo?.fullName as string).split(" ")[0][0]}
                </AvatarFallback>
              </Avatar>

              <p className="text-md font-medium">
                {(userInfo?.fullName as string).split(" ")[0]}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => handleNavigation("/user/profile")}
              >
                <User />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleNavigation("/user/upload-recipe")}
              >
                <Pencil />
                <span>Dashboard</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleNavigation("/user/settings")}
              >
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/login">Log in</Link>
          </Button>

          <Button variant={"outline"} asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
