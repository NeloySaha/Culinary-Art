import { useState } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ChefHat, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const handleNavigation = (link: string): void => {
    setIsOpen(false);
    router.push(link);
  };

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
          <DrawerFooter>
            <Button onClick={() => handleNavigation("/login")}>Log in</Button>

            <Button
              variant={"outline"}
              onClick={() => handleNavigation("/signup")}
            >
              Sign up
            </Button>
          </DrawerFooter>
          {/* <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose> */}
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
