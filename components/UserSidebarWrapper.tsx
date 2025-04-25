import { getSession } from "@/lib/actions";
import { JWTPayload } from "jose";

import { ChefHat } from "lucide-react";
import Link from "next/link";
import { NavUser } from "./NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar";
import UserSidebarContent from "./UserSidebarContent";

export default async function UserSidebarWrapper() {
  const session = await getSession();

  if (!session) return null;
  return (
    <Sidebar>
      <SidebarHeader className="mb-10">
        <Link
          href="/"
          className="flex justify-center gap-2 text-primary items-center mt-3"
        >
          <ChefHat className="h-5 w-5" />
          <p className="text-2xl font-semibold">Culinary Art</p>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <UserSidebarContent />
      </SidebarContent>

      <SidebarFooter>
        <NavUser session={session as JWTPayload} />
      </SidebarFooter>
    </Sidebar>
  );
}
