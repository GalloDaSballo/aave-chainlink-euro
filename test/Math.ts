import { expect } from "chai";
import { BigNumber } from "ethers";

const MOCK_CHAINLINK_ANSWER = BigNumber.from(119338000);
const MOCK_USDC_INPUT = BigNumber.from(1000);
const MOCK_EURO_INPUT = BigNumber.from(837);

const FEED_DECIMALS = 8;

const fromUSDCToEuro = (usdc: BigNumber, ratio: BigNumber, ratioDecimals: number) =>
    usdc.mul(10 ** ratioDecimals).div(ratio);

const fromEuroToUSDC = (euro: BigNumber, ratio: BigNumber, ratioDecimals: number) =>
    euro.mul(ratio).div(10 ** ratioDecimals);

describe("Unit tests", function () {
    it("Convert USDC to EURO", () => {
        expect(fromUSDCToEuro(MOCK_USDC_INPUT, MOCK_CHAINLINK_ANSWER, FEED_DECIMALS)).to.equal("837");
    });

    it("Convert EUR to USDC", () => {
        expect(fromEuroToUSDC(MOCK_EURO_INPUT, MOCK_CHAINLINK_ANSWER, FEED_DECIMALS)).to.equal("998");
    });

    it("Convert USDC to EURO, then EURO goes UP, then convert back", () => {
        const usdcToEuro = fromUSDCToEuro(MOCK_USDC_INPUT, MOCK_CHAINLINK_ANSWER, FEED_DECIMALS);
        expect(usdcToEuro).to.equal("837");

        const NEW_RATIO = MOCK_CHAINLINK_ANSWER.add(10662000);
        expect(NEW_RATIO).to.equal("130000000"); // 1 EUR = 1.3 USD

        const fromEuroWithIncreaseToUSDC = fromEuroToUSDC(usdcToEuro, NEW_RATIO, FEED_DECIMALS);
        expect(fromEuroWithIncreaseToUSDC).to.equal("1088");

        // Check in contract that checks MAX, and uses max as the ratio

        // Contract has lost 88 USDC
        // If contract looses all it's fund it's not good for the last person
    });

    it("Convert USDC to EURO, then EURO goes DOWN, then convert back", () => {
        const usdcToEuro = fromUSDCToEuro(MOCK_USDC_INPUT, MOCK_CHAINLINK_ANSWER, FEED_DECIMALS);
        expect(usdcToEuro).to.equal("837");

        const NEW_RATIO = MOCK_CHAINLINK_ANSWER.sub(19338000);
        expect(NEW_RATIO).to.equal("100000000"); // 1 EUR = 1 USD

        const fromEuroWithReductionToUSDC = fromEuroToUSDC(usdcToEuro, NEW_RATIO, FEED_DECIMALS);
        expect(fromEuroWithReductionToUSDC).to.equal("837");

        // Contract is fine, but customer "lost" 163 USDC which are now in the contract
    });
});
