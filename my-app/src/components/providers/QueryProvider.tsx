"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // this function will be used when you don't pass queryFn
        queryFn: async ({ queryKey }) => {
          const [url] = queryKey as [string];
          const res = await fetch(url.toString());

          if (!res.ok) {
            throw new Error(`Request failed for ${url}`);
          }

          return res.json();
        },
        staleTime: 1000 * 60, // 1 minute, optional
        refetchOnWindowFocus: false,
      },
    },
  });
}

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => createQueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
