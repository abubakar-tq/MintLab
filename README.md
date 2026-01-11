# Custom NFT Minting dApp (Foundry + Next.js)

End-to-end NFT minting project:
- **Smart contracts**: ERC-721 written in Solidity and tested/deployed with **Foundry**
- **Frontend**: **Next.js** UI that uploads NFT media + metadata to **IPFS via Pinata** and mints on-chain via **wagmi**

## What’s Included

- `src/Nft.sol`: Minimal ERC-721 with `mint(tokenUri)` and an on-chain token URI mapping
- `script/DeployNft.s.sol`: Deploy script (Foundry `forge script`)
- `script/Interactions.s.sol`: Example mint script (uses `foundry-devops` to load last deployment)
- `frontend/`: Next.js app (wallet connect + mint form + `/api/upload` for Pinata uploads)

## Quick Start (Local)

### Prerequisites

- Foundry (`forge`, `anvil`, `cast`): https://book.getfoundry.sh/getting-started/installation
- Node.js (LTS recommended) + npm
- Git

### 1) Clone with submodules

If you cloned without submodules:

```bash
git submodule update --init --recursive
```

### 2) Environment variables

Create local env files from the examples:

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
```

### 3) Run a local chain + deploy

```bash
make anvil
make deploy-anvil
```

### 4) Run the frontend

Update the deployed contract address in `frontend/src/lib/contractAddresses.js` (chain id `31337` for Anvil), then:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Sepolia Deployment (Optional)

1) Set `SEPOLIA_RPC_URL` + `ETHERSCAN_API_KEY` in `.env`
2) Ensure you have a Foundry keystore account named `sepkey` (the Makefile uses `--account sepkey`)
3) Deploy + verify:

```bash
make deploy-sepolia
```

## Useful Commands

- Contracts: `forge build`, `forge test`, `forge fmt`
- Make targets: `make build`, `make test`, `make format`, `make deploy-anvil`, `make mint-nft`

## Security Notes

- Do not commit real secrets: `.env`, `frontend/.env`, API keys, private keys, JWTs.
- This repo includes `.env.example` files for reproducible setup without exposing credentials.

## Repo Structure

- `src/`: Solidity contracts
- `script/`: Foundry scripts (deploy + interactions)
- `test/`: Foundry tests
- `frontend/`: Next.js dApp
