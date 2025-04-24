import { useState } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Cookies from "js-cookie";
import { ChefHat, Menu, Pencil, Settings, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { UserInfo } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { JWTPayload } from "jose";
import { logout } from "@/lib/actions";
import { Separator } from "./ui/separator";

export default function MobileNavbar({ userInfo }: { userInfo: JWTPayload }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const handleNavigation = (link: string): void => {
    setIsOpen(false);
    router.push(link);
  };

  async function handleLogout() {
    await logout();
    setIsOpen(false);
    router.push("/");
  }

  return (
    <nav className="lg:hidden px-4 flex items-center justify-between">
      <div
        className={`${
          pathName === "/login" || pathName === "/signup"
            ? "text-primary-foreground"
            : "text-primary"
        } text-primary flex gap-1 items-center hover:cursor-pointer`}
        onClick={() => handleNavigation("/")}
      >
        <ChefHat className="h-5 w-5" />
        <p className="text-2xl font-semibold">Culinary Art</p>
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger>
          <Menu className="h-6 w-6 text-primary" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <Button onClick={() => handleNavigation("/")} variant={"ghost"}>
              Home
            </Button>

            <Button onClick={() => handleNavigation("/")} variant={"ghost"}>
              Recipes
            </Button>

            <Button onClick={() => handleNavigation("/")} variant={"ghost"}>
              Shop Item
            </Button>
            <Button onClick={() => handleNavigation("/")} variant={"ghost"}>
              Upload Recipe
            </Button>
            <Button
              onClick={() => handleNavigation("/about")}
              variant={"ghost"}
            >
              About Us
            </Button>
          </DrawerHeader>

          <Separator />

          <DrawerFooter>
            {userInfo ? (
              <>
                <div className="pt-3 pb-2 flex justify-center gap-2 items-center">
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

                <Button
                  variant={"ghost"}
                  onClick={() => handleNavigation("/signup")}
                >
                  <User />
                  <span>Profile</span>
                </Button>

                <Button
                  variant={"ghost"}
                  onClick={() => handleNavigation("/signup")}
                >
                  <Pencil />
                  <span>Upload recipe</span>
                </Button>

                <Button
                  variant={"ghost"}
                  onClick={() => handleNavigation("/signup")}
                >
                  <Settings />
                  <span>Settings</span>
                </Button>

                <Button variant={"destructive"} onClick={handleLogout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => handleNavigation("/login")}>
                  Log in
                </Button>

                <Button
                  variant={"outline"}
                  onClick={() => handleNavigation("/signup")}
                >
                  Sign up
                </Button>
              </>
            )}
          </DrawerFooter>
          {/* <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose> */}
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
