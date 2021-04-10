/* eslint-disable func-names */
import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { MockTwitterVerification, Signature } from "../typechain";
import { deploy } from "./helpers";

const TWITTER_HANDLE = "gallodasballo"
const REQ_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000"; // Bytes32(0)

const setup = deployments.createFixture(async () => {
    const admin = await ethers.getNamedSigner("admin");
    const signature = (await deploy("Signature", { args: [], connect: admin })) as Signature;
    const twitterVerification = (await deploy("MockTwitterVerification", { args: [], connect: admin, libraries: {
        Signature: signature.address
    } })) as MockTwitterVerification;
    return {
        twitterVerification,
        signature
    };
});

describe("Unit tests", function () {
    describe("Signature", function () {
        let twitterVerification: MockTwitterVerification;
        let signature: Signature;

        beforeEach(async function () {
            const deployment = await setup();
            twitterVerification = deployment.twitterVerification;
            signature = deployment.signature;
        });

        it("Request a twitter verification by providing signature of twitter handle and tweet id", async function () {
            const admin = await ethers.getNamedSigner("admin");
            const hashToSign = await signature.getHash(TWITTER_HANDLE)
            const signedMessage = await admin.signMessage(ethers.utils.arrayify(hashToSign))
            console.log("signedMessage", signedMessage)
            const tx = await (await twitterVerification.DEMOrequestTwitterVerification(signedMessage, "123")).wait();
            console.log("witterVerification.DEMOrequestTwitterVerification tx", tx)
            const checkRequestIdToUserAddress = await twitterVerification.requestIdToAddress(REQ_HASH)
            expect(checkRequestIdToUserAddress).to.equal(admin.address);
        });

        it("Verify a Twitter handle", async function () {
            /** Setup request */
            const admin = await ethers.getNamedSigner("admin");
            const hashToSign = await signature.getHash(TWITTER_HANDLE)
            const signedMessage = await admin.signMessage(ethers.utils.arrayify(hashToSign))
            console.log("signedMessage", signedMessage)
            const tx = await (await twitterVerification.DEMOrequestTwitterVerification(signedMessage, "123")).wait();

            /** Fulfill request */
            const recover = await (await twitterVerification.DEMOfulfillTwitterVerification(REQ_HASH, ethers.utils.formatBytes32String(TWITTER_HANDLE))).wait();

            const verifiedHandle = await twitterVerification.verifiedHandle(admin.address)
            expect(verifiedHandle).to.equal(ethers.utils.formatBytes32String(TWITTER_HANDLE))
            expect(verifiedHandle).not.to.equal(ethers.utils.formatBytes32String("gibberish"))
        });

    });
});
