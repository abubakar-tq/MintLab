// lib/chains.js (you can put this separately or inline)
export const anvil = {
  id: 31337,
  name: 'Anvil',
  nativeCurrency: {
    name: 'AnvilETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:8545'],
    },
    public: {
      http: ['http://localhost:8545'],
    },
  },
  blockExplorers: {
    default: { name: 'Localhost', url: 'http://localhost:8545' },
  },
  testnet: true,
};
