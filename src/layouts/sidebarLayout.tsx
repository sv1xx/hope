import { AppSidebar } from '@/components/appSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted flex min-h-screen items-center justify-center">
      <div className="bg-background relative h-auto w-full max-w-275 overflow-hidden rounded-xl shadow-lg">
        <SidebarProvider>
          <div className="flex w-full items-start">
            <AppSidebar />
            <div className="h-full w-full py-2">{children}</div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
