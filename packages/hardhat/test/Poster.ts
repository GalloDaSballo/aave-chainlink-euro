/* eslint-disable func-names */
import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { Poster } from "../typechain";
import { deploy } from "./helpers";

const setup = deployments.createFixture(async () => {
    const admin = await ethers.getNamedSigner("admin");
    const poster = (await deploy("Poster", { args: [], connect: admin })) as Poster;

    return {
        poster
    };
});

describe("Unit tests", function () {
    describe("Poster", function () {
        let poster: Poster;

        beforeEach(async function () {
            const deployment = await setup();
            poster = deployment.poster;
        });

        it("Publish a new article with title, content and image", async function () {
            const publish = (await poster.publish("Somebody", "When I was a kid, I had a dog named bill", "No image"));
            const res = await publish.wait()
            const postEvent = res?.events && res.events[0]
            expect(postEvent?.event === "NewPost")
            expect(postEvent?.args?.author).to.equal("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
            expect(postEvent?.args?.title).to.equal("Somebody")
            expect(postEvent?.args?.content).to.equal("When I was a kid, I had a dog named bill")
            expect(postEvent?.args?.imageHash).to.equal("No image")
        });
    });
});
