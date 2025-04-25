"use client";
import { Home, Info, Pencil, Settings, Utensils } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "About Us",
    url: "/about",
    icon: Info,
  },
  {
    title: "Profile",
    url: "/user/profile",
    icon: Utensils,
  },
  {
    title: "Upload recipe",
    url: "/user/upload-recipe",
    icon: Pencil,
  },
  {
    title: "Settings",
    url: "/user/settings",
    icon: Settings,
  },
];

export default function UserSidebarContent() {
  const router = useRouter();
  const { isMobile, toggleSidebar } = useSidebar();

  function handleClick(href: string) {
    router.push(href);
    if (isMobile) {
      toggleSidebar();
    }
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                onClick={() => handleClick(item.url)}
                className={
                  "flex items-center w-full space-x-2 pl-4 py-2 rounded-lg mb-1 transition-colors text-sm font-semibold"
                }
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
