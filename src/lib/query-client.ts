import { QueryClient } from "@tanstack/react-query";
import { router } from "@/router";
import { useAuthStore } from "@/store/auth";

export async function apiFetch(url: string, options: RequestInit = {}) {
  const { token, logout } = useAuthStore.getState();
  const isFormData = options.body instanceof FormData; // Don't set JSON content type if body is FormData

  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body && !isFormData
        ? { "Content-Type": "application/json" }
        : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    logout();
    router.navigate({
      to: "/login",
      search: { redirect: router.state.location.href },
    });
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("text/html")) {
      throw new Error("Back-end heeft geen secret gezet");
    }
    const body = await response.json().catch(() => null);

    // Extract validation error messages if present. I needed this for the photo_url and banner_url thingys in company profile.
    const validationDetails = body?.errors
      ? Object.values(body.errors)
          .flat()
          .filter((v): v is string => typeof v === "string")
          .join(" ")
      : "";
    const message =
      validationDetails ||
      body?.message ||
      `Request failed: ${response.status} ${response.statusText}`;
    throw new Error(message);
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
