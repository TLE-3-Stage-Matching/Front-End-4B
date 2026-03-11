import { QueryClient } from "@tanstack/react-query";
import { router } from "@/router";
import { useAuthStore } from "@/store/auth";

export async function apiFetch(url: string, options: RequestInit = {}) {
  const { token, logout } = useAuthStore.getState();

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    console.log('trip')
    logout();
    router.navigate({
      to: "/login",
      search: { redirect: router.state.location.href },
    });
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        return apiFetch(url);
      },
    },
  },
});
