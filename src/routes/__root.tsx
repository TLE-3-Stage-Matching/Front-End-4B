import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { Toaster } from "@/components/ui/sonner";
import Nav from "@/components/nav.tsx";
import type { QueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootComponent,
  },
);

function RootComponent() {
  const token = useAuthStore((s) => s.token);

  return (
    <>
      <Toaster />
      <a
        href="#content"
        className="absolute top-0 left-0 z-9999 -translate-y-full bg-[#E20147] px-4 py-2 text-black opacity-0 shadow-md transition-all duration-200 focus:translate-y-0 focus:opacity-100 focus:ring-2 focus:ring-white focus:outline-none"
      >
        Ga naar hoofdinhoud
      </a>

      <div className={"flex max-w-screen"}>
        {token && <Nav />}
        <main role="main" id={"content"} className={"w-full p-2 px-6"}>
          <Outlet />
        </main>
      </div>

      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
}
