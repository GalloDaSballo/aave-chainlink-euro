/* eslint-disable func-names */
import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { Signature } from "../typechain";
import { deploy } from "./helpers";

const setup = deployments.createFixture(async () => {
    const admin = await ethers.getNamedSigner("admin");
    const signature = (await deploy("Signature", { args: [], connect: admin })) as Signature;

    return {
        signature
    };
});

describe("Unit tests", function () {
    describe("Signature", function () {
        let signature: Signature;

        beforeEach(async function () {
            const deployment = await setup();
            signature = deployment.signature;
        });

        it("Signature Hash Generation Works", async function () {
            const hash = (await signature.getHash("gallodasballo"));
            expect(hash).to.equal("0xbf614365b769eea31dbd2e3d7fc29086db337ce06cf38df4b500ec01d08de5c6")
        });

        it("With Recover Verification Works", async function () {
            const recover = (await signature.recover("0xbf614365b769eea31dbd2e3d7fc29086db337ce06cf38df4b500ec01d08de5c6", "0x76eb0cca2d0fce9aa7bce03b03b34b8d843587df1e5e991f696d9b43fa7d68511b77e36b3339f7dba106fcf33e797975c0af78722c5576ce5d68a984217bc34e1b"));
            expect(recover).to.equal("0xc2eefBef94a19F579896660CB2144886920C8d7B")
        });

        it("Signature Verification Works", async function () {
            const getSign = (await signature.getAddress("gallodasballo", "0x76eb0cca2d0fce9aa7bce03b03b34b8d843587df1e5e991f696d9b43fa7d68511b77e36b3339f7dba106fcf33e797975c0af78722c5576ce5d68a984217bc34e1b"));
            expect(getSign).to.equal("0xc2eefBef94a19F579896660CB2144886920C8d7B")
        });
    });
});
