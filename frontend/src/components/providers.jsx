// components/Providers.jsx
"use client";

import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '@/lib/wagmiConfig';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
