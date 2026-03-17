import { SidebarProvider } from "@/components/ui/sidebar";
import AppSiderbar from "./_common/app-sidebar";
import Header from "./_common/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <AppSiderbar />

        <main className="w-full flex-1">
          <Header />
          <div className="w-full px-4 lg:px-0 mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </SidebarProvider>
      </div>
  );
}
