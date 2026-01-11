# Frontend (Next.js Mint UI)

Next.js app that:
- Connects a wallet (wagmi)
- Uploads NFT media + metadata to IPFS via Pinata (`/api/upload`)
- Calls the ERC-721 `mint(tokenUri)` function using the uploaded metadata URI

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:3000`.

## Required Environment Variables

See `frontend/.env.example`.

- `PINATA_JWT`: Pinata JWT used by the server route in `src/app/api/upload/route.js`
- `PINATA_GATEWAY`: Your Pinata gateway domain (used by the SDK client)

## Contract Address

Update `src/lib/contractAddresses.js` with your deployed contract address:
- `31337`: Anvil local chain
- `11155111`: Sepolia

## Build

```bash
npm run build
npm run start
```
