import HomeNavbar from "@/app/(home)/home-navbar";
import HomeSidebarPrimary from "@/app/(home)/home-sidebar-primary";
import HomeSidebarSecondary from "@/app/(home)/home-sidebar-secondary";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex bg-gradient-to-b from-violet-900/30 via-violet-900/20 to-slate-900">
      <HomeSidebarPrimary />
      <HomeSidebarSecondary />
      <div className="flex flex-col h-full w-full lg:p-2">
        <main className="lg:rounded-2xl overflow-auto py-4 px-6 bg-zinc-900 border lg:border-zinc-500 w-full h-full">
          <HomeNavbar />
          {children}
        </main>
      </div>
    </div>
  );
}
