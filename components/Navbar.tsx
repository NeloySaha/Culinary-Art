"use client";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  return (
    <header className="backdrop-blur-lg w-full z-40 fixed py-4">
      <MobileNavbar />
      <DesktopNavbar />
    </header>
  );
}
