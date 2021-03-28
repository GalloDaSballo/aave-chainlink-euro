// SPDX-License-Identifier: MIT
// Interest Bearing Euro, using Chainlink Feeds for Conversion between USDC and Euro

import "hardhat/console.sol";

pragma solidity ^0.6.12;


import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

import {ILendingPool} from "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";

contract Euro is ERC20, Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address public immutable usdc; // Kovan aave tesnet USDC 0xe22da380ee6b445bb8273c81944adeb6e8450422
    address public immutable  aUsdc;  // Stable debt aUSDC on Kovan 0x252C017036b144A812b53BC122d0E67cBB451aD4
    bool public constant isTest = false;

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: EUR/USD
     * Address: 0x0c15Ab9A0DB086e062194c273CC79f41597Bbf13
     * Etherscan: https://kovan.etherscan.io/address/0x0c15Ab9A0DB086e062194c273CC79f41597Bbf13
     */
    constructor(address _usdc, address _aUsdc) public ERC20("Interest Bearing Euro", "ibEURO") {
        priceFeed = AggregatorV3Interface(0x0c15Ab9A0DB086e062194c273CC79f41597Bbf13);
        usdc = _usdc;
        aUsdc = _aUsdc;
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (uint) {
        if(isTest){
            // Testing only
            return 119338000;
        }

        (
            uint80 roundID, 
            int price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return uint(price);
    }

    function viewMint(uint256 usdAmount) public view returns (uint256) {
        uint256 ratio = getLatestPrice();
        console.log("ratio");
        console.log(ratio);

        uint256 feedDecimals = uint256(isTest ? 8 : priceFeed.decimals()); // priceFeed.decimals()
        console.log("feedDecimals");
        console.log(feedDecimals);

        uint256 euroAmount = usdAmount.mul(10 ** feedDecimals).div(ratio);

        console.log("euroAmount");
        console.log(euroAmount);

        return euroAmount;
    }

    function viewBurn(uint256 euroAmount) public view returns (uint256) {
        uint256 ratio = getLatestPrice();
        console.log("ratio");
        console.log(ratio);

        uint256 feedDecimals = uint256(isTest ? 8 : priceFeed.decimals()); //// priceFeed.decimals()
        console.log("feedDecimals");
        console.log(feedDecimals);

        uint256 usdcAmount = (euroAmount).mul(ratio).div(10 ** feedDecimals);
        console.log("usdcAmount");
        console.log(usdcAmount);

        return usdcAmount;
    }

    function mint(uint256 usdAmount) public {
        // Get the USDC from customer
        IERC20(usdc).safeTransferFrom(msg.sender, address(this), usdAmount);

        // Use the USDC to get aUSDC
        console.log("mint, todo, send to aave");

        // Mint the token for them 
        // Calculate Ratio
        uint256 euroAmount = viewMint(usdAmount);

        _mint(msg.sender, euroAmount);
    }

    function burn(uint256 euroAmount) public {
        // Burn the Euro amount
        _burn(msg.sender, euroAmount); 

        // Get the Ratio for the customer
        uint usdAmount = viewBurn(euroAmount);

        // Send them the USD based on the ratio
        IERC20(usdc).safeTransfer(msg.sender, usdAmount);


        // Remove the aUSDC from AAVE
        console.log("burn, todo, withdraw from aave");

        // Send them the USDC
    }

    function rug(address token, address to) public onlyOwner {
        // Get token and send it to 
        // Clasic Rugpull
        IERC20(token).safeTransfer(to, IERC20(token).balanceOf(address(this)));
    }

    

    
}
