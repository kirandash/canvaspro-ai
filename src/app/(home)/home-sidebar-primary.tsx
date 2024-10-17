"use client";
import { HomePrimarySidebarItem } from "@/app/(home)/home-primary-sidebar-item";
import { BadgeHelp, Folder, Home, PanelsLeftBottom } from "lucide-react";
import { usePathname } from "next/navigation";

const HomeSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-18 h-full overflow-y-auto pt-6 shrink-0 border border-r-zinc-500">
      <ul className="flex flex-col">
        <HomePrimarySidebarItem
          href="/"
          icon={Home}
          label="Home"
          isActive={pathname === "/"}
        />
        <HomePrimarySidebarItem
          href="/projects"
          icon={Folder}
          label="Projects"
          isActive={pathname === "/projects"}
        />
        <HomePrimarySidebarItem
          href="/templates"
          icon={PanelsLeftBottom}
          label="Templates"
          isActive={pathname === "/templates"}
        />
        <HomePrimarySidebarItem
          href="mailto:dummy@bgwebagency.in"
          icon={BadgeHelp}
          label="Help"
          isActive={false}
        />
      </ul>
    </aside>
  );
};

export default HomeSidebar;
