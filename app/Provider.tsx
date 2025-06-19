"use client";

import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

const Provider = ({children}:{children: React.ReactNode}) => {
	return (
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</WagmiProvider>
	);
};

export default Provider;
