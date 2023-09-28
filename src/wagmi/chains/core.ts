import { Chain } from 'wagmi'

export const core = {
    id: 1116,
    name: 'Core',
    network: 'core',
    nativeCurrency: {
        decimals: 18,
        name: 'Core',
        symbol: 'CORE',
    },
    rpcUrls: {
        public: { http: ['https://rpc-core.icecreamswap.com'] },
        default: { http: ['https://rpc-core.icecreamswap.com'] },
    },
    blockExplorers: {
        etherscan: { name: 'CoreExplorer', url: 'https://scan.coredao.org' },
        default: { name: 'CoreExplorer', url: 'https://scan.coredao.org' },
    },
    contracts: {
        multicall3: {
            address: '0xf3a3dAf360161B2f10c645EF039C709A3Fd4Ea62',
            blockCreated: 852772,
        },
    },
} as const satisfies Chain