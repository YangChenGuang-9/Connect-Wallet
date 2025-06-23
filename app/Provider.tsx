"use client";

import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {TooltipProvider} from "@/components/ui/tooltip";
const queryClient = new QueryClient()


const Provider = ({children}:{children: React.ReactNode}) => {
	return (
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<TooltipProvider delayDuration={100}>
						{children}
					</TooltipProvider>
				</QueryClientProvider>
			</WagmiProvider>
	);
};

export default Provider;
