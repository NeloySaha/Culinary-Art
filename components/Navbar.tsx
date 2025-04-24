"use client";
import { UserInfo } from "@/lib/types";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { JWTPayload } from "jose";

export default function Navbar({ userInfo }: { userInfo: JWTPayload }) {
  return (
    <header className="backdrop-blur-lg w-full z-40 fixed py-4">
      <MobileNavbar userInfo={userInfo} />
      <DesktopNavbar userInfo={userInfo} />
    </header>
  );
}
