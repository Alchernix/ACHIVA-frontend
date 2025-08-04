"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()); // 매번 재생성되지 않도록

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
