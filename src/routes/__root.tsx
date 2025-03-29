import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavBar } from "@/components/root/nav-bar.tsx";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { UserNav } from "@/components/root/user-nav.tsx";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouterState();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <NavBar className="mx-6" currentRoute={router.location.pathname} />
            <div className="ml-auto flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search inventory..."
                  className="w-[200px] lg:w-[300px] pl-8"
                />
              </div>
              <UserNav />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
      <Toaster />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
}
