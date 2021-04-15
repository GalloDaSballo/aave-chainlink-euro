/* eslint-disable func-names */
import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { MockTwitterVerification, Signature } from "../typechain";
import { deploy } from "./helpers";

const TWITTER_HANDLE = "handle"
const REQ_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000"; // Bytes32(0)

const MOCK_TWEET = {
  "data": {
      "author_id": "944553499",
      "id": "1382355015122173959",
      "text": "Random signature: 0x462c6812e0dbae99a490062234c12c4e57b233df944d2a6efcc62f057c55030e2d94c3e8b9a07690f393fc2258c7e5c47f8426002f12858d64ce34c3c37e5f491c"
  },
  "includes": {
      "users": [
          {
              "id": "944553499",
              "name": "Alex the Entreprenerd",
              "username": "GalloDaSballo"
          }
      ]
  }
}

const fromTweetToSignature = (tweet = MOCK_TWEET): string => {
  const text = tweet.data.text
  const foundSignature = /(0x[A-Fa-f0-9]{130})/.exec(text)
  if(!foundSignature?.[0]){
    throw new Error("No Signature in Tweet")
  }
  return foundSignature[0]
}

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
    describe("Signature Parsing", function () {
        let twitterVerification: MockTwitterVerification;
        let signature: Signature;

        beforeEach(async function () {
            const deployment = await setup();
            signature = deployment.signature;
        });

        it("Default signature has a length of", async function () {
            const admin = await ethers.getNamedSigner("admin");
            const hashToSign = await signature.getHash(TWITTER_HANDLE)
            const signedMessage = await admin.signMessage(ethers.utils.arrayify(hashToSign))
            console.log("signedMessage", signedMessage)
            console.log("signedMessage length", signedMessage.length)
            expect(signedMessage.length).to.equal(132);
        })

        it("Random signature has a length of 132", async function () {
          // Random string https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
          let random = Math.random().toString(36).substring(7);
          console.log("random", random);
          const admin = await ethers.getNamedSigner("admin");
          const hashToSign = await signature.getHash(random)
          const signedMessage = await admin.signMessage(ethers.utils.arrayify(hashToSign))
          console.log("signedMessage", signedMessage)
          console.log("signedMessage length", signedMessage.length)
          expect(signedMessage.length).to.equal(132);
        })

        it("Parsing and fetching of signature from mock tweet", async function () {
          const signature = fromTweetToSignature(MOCK_TWEET)
          expect(signature).to.equal("0x462c6812e0dbae99a490062234c12c4e57b233df944d2a6efcc62f057c55030e2d94c3e8b9a07690f393fc2258c7e5c47f8426002f12858d64ce34c3c37e5f491c");
          expect(signature.length).to.equal(132);
        })
      })
  })