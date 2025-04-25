"use client";
import { JWTPayload } from "jose";
import { usePathname } from "next/navigation";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar({ userInfo }: { userInfo: JWTPayload }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/user"))
    return null;
  return (
    <header className="backdrop-blur-lg w-full z-40 fixed py-4">
      <MobileNavbar userInfo={userInfo} />
      <DesktopNavbar userInfo={userInfo} />
    </header>
  );
}
