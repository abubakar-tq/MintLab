-include .env

.PHONY: all test clean deploy fund help install snapshot format anvil mint nft mood

DEFAULT_ANVIL_KEY := 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

help:
	@echo "Usage:"
	@echo "  make deploy [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""
	@echo ""
	@echo "  make fund [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""

all: clean remove install update build

# Clean the repo
clean  :; forge clean

# Remove modules
remove :; rm -rf .gitmodules && rm -rf .git/modules/* && rm -rf lib && touch .gitmodules && git add . && git commit -m "modules"

install :; forge install cyfrin/foundry-devops@0.2.2 --no-commit && forge install smartcontractkit/chainlink-brownie-contracts@1.1.1 --no-commit && forge install foundry-rs/forge-std@v1.8.2 --no-commit && forge install transmissions11/solmate@v6 --no-commit

# Update Dependencies
update:; forge update

build:; forge build

test :; forge test 

snapshot :; forge snapshot

format :; forge fmt

anvil :; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

NETWORK_ARGS := --rpc-url http://localhost:8545 --private-key $(DEFAULT_ANVIL_KEY) --broadcast -vvvv


deploy-sepolia:; @forge script script/DeployNft.s.sol:DeployNft --rpc-url $(SEPOLIA_RPC_URL) --account sepkey --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv

deploy-anvil:
	forge script script/DeployNft.s.sol:DeployNft $(NETWORK_ARGS)

mint-nft:
	forge script script/Interactions.s.sol:MintNft $(NETWORK_ARGS)

mint-nft-sepolia:
	forge script script/Interactions.s.sol:MintNft --rpc-url $(SEPOLIA_RPC_URL) --account sepkey --broadcast



deploy-anvil-mood:
	forge script script/DeployMoodNft.s.sol:DeployMoodNft $(NETWORK_ARGS)

mint-nft-mood:
	forge script script/Interactions.s.sol:MintMoodNft $(NETWORK_ARGS)

mint-nft-sepolia-mood:
	forge script script/Interactions.s.sol:MintMoodNft --rpc-url $(SEPOLIA_RPC_URL) --account sepkey --broadcast

anvil-mood-flip:
	forge script script/Interactions.s.sol:FlipMood $(NETWORK_ARGS) 
	


