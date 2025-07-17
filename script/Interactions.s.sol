// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";
import {Nft} from "src/Nft.sol";

contract MintNft is Script {
    string public constant PENGUIN_URI = "https://api.pudgypenguins.io/lil/6930";

    function run() external {
        address recentDeployed = DevOpsTools.get_most_recent_deployment("Nft", block.chainid);

        mintPenguin(recentDeployed);
    }

    function mintPenguin(address nftAddress) public {
        vm.startBroadcast();
        Nft(nftAddress).mint(PENGUIN_URI);
        vm.stopBroadcast();
    }
}
