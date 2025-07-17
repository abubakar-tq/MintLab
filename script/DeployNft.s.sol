// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {Nft} from "src/Nft.sol";

contract DeployNft is Script {
    function run() external returns (Nft){
        return deployNft();

    }

    function deployNft() public returns (Nft nft) {
        vm.startBroadcast();
        nft = new Nft();
        vm.stopBroadcast();
        return nft;
    }
}
