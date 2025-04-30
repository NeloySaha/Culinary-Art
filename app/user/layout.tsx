import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserSidebarWrapper from "@/components/UserSidebarWrapper";
import { Menu } from "lucide-react";

export default function RestaurantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <UserSidebarWrapper />

      <SidebarInset>
        <div className="mt-4 flex justify-end md:justify-start px-2">
          <SidebarTrigger className="[&_svg]:!size-6 size-10" />
        </div>

        <main className="flex-1 py-16 px-3">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
