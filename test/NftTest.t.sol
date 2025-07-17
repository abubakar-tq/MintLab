// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/Script.sol";
import {Nft} from "src/Nft.sol";
import {Test} from "forge-std/Test.sol";
import {DeployNft} from "script/DeployNft.s.sol";

contract NftTest is Test {
    string public constant EXPECTED_TOKEN_URI = "https://api.pudgypenguins.io/lil/6930";

    DeployNft public deployer;
    Nft public nft;
    address public constant USER = address(1);

    function setUp() public {
        vm.startBroadcast();
        deployer = new DeployNft();
        vm.stopBroadcast();
        nft = deployer.run();
    }

    modifier mintNft() {
        vm.prank(USER);
        nft.mint(EXPECTED_TOKEN_URI);
        _;
    }

    function testTokenUriReturnsCorrectUri() external mintNft {
        string memory tokenUri = nft.tokenURI(0);

        assertEq(keccak256(abi.encodePacked(EXPECTED_TOKEN_URI)), keccak256(abi.encodePacked(tokenUri)));
    }

    function testCanMintAndHaveABalance() public mintNft {
        console.log(nft.tokenURI(0));

        assert(nft.balanceOf(USER) == 1);
    }

    function testTokenCounterUpdatedCorrectly() external mintNft {
        uint256 tokenCounter = nft.getTokenCounter();

        assert(tokenCounter == 1);
    }

    function testMultipleNftsMintedCorrectly() external mintNft {
        vm.prank(USER);
        nft.mint(EXPECTED_TOKEN_URI);

        string memory tokenUri = nft.tokenURI(1);

        assertEq(keccak256(abi.encodePacked(EXPECTED_TOKEN_URI)), keccak256(abi.encodePacked(tokenUri)));
    }
}
