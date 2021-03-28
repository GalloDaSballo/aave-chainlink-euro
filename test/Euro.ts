/* eslint-disable func-names */
import { expect } from "chai";
import { MockContract } from "ethereum-waffle";
import { BigNumber } from "ethers";
import { deployments, ethers } from "hardhat";
import { Euro } from "../typechain";
import { deploy, deployMock } from "./helpers";

const setup = deployments.createFixture(async () => {
    const admin = await ethers.getNamedSigner("deployer");
    const euro = (await deploy("Euro", {
        args: ["0xe22da380ee6b445bb8273c81944adeb6e8450422", "0x252C017036b144A812b53BC122d0E67cBB451aD4"],
        connect: admin,
    })) as Euro;
    const mockEuro = await deployMock("Euro", admin);

    return {
        euro,
        mockEuro,
    };
});

describe("Unit tests", function () {
    describe("Euro", function () {
        let euro: Euro;
        let mockEuro: MockContract;

        beforeEach(async function () {
            const deployment = await setup();
            euro = deployment.euro;
            mockEuro = deployment.mockEuro;
        });

        it("Fetch Chainlink Feed value", async function () {
            const price = await euro.getLatestPrice();
            expect(Number(price.toString())).to.equal(119338000);
        });

        it("Test Ratio from USDC to EURO", async function () {
            const price = await euro.viewMint(BigNumber.from(1000));
            expect(Number(price.toString())).to.equal(837);
        });

        it("Test Ratio from EURO to USDC", async function () {
            const price = await euro.viewBurn(BigNumber.from(837));
            expect(Number(price.toString())).to.equal(998);
        });
    });
});
