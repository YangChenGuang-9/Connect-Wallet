import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, hardhat } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
	connectors: [
		injected(),
		// ... 其它
	],
	chains: [mainnet, sepolia, hardhat],
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
		[hardhat.id]: http('http://127.0.0.1:8545'),
	},
})
