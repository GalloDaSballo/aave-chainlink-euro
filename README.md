# OpenSky, decentralized, uncensorable CMS for your blog

Write your content on Matic, 
Deploy it to IPFS, 
Verify your Credentials with Chainlink

## Technologies
- Docker (image to build your blog and deploy it to IPFS)
- IPFS to deploy your blog (through Pinata)
- Hardhat, smart contract development and testing
- NextJS, frontend
- TheGraph, to track new articles
- Create React App, for default blog template (built and deployed by the Docker Image)
- Matic, the contracts are deployed on Matic to have faster block time (2 s) and cheaper gas (Writing 20 paragraphs on chain costs less than a cent)

This is a monorepo for the OpenSky CMS website, containing:

## hardhat
The contracts, with tests and tasks to publish new content, using Solidity Template

## next
The UI for the website, to interact with the protocol and publish new content, using NextJS

## subgraph
The subgraph code to track new posts, using TheGraph

# More Code

There are more repos that make this project work, see here

## Deploy to IPFS Docker Image:

Docker image for server to deploy a blog to docker, to deploy a new blog
POST / 
Req.body.address // The address of the author or then blog
The address will be injected at build time in the Blog Template
The template will then be deployed to IPFS

https://github.com/GalloDaSballo/opensky-deploy-ipfs-docker


## Default Blog Template:

Default Blog Template, built with CRA and TheGraph
Inject REACT_APP_AUTHOR_ADDRESS to replace it during build time to build your own blog

https://github.com/GalloDaSballo/opensky-default-template

## Twitter Verification Chainlink External Adapter

https://github.com/GalloDaSballo/opensky-twitter-verification-cl-ea

An external adapter for verifying your twitter account.

See `next/pages/verify.tsx` for the steps in verification

See `hardhat/contracts/TwitterVerification.sol` for the Smart Contract

Tests for the verification are in `hardhat/tests/MockTwitterVerification.sol`

## Local Blog Testing

## Run a hardhat localhost node
yarn localnode

## Deploy the contract to localhost
yarn deploy --network localhost 

### Publish a new post via the PublishPost task

yarn hardhat PublishPost --network localhost




## Addressess 
Hardhat Deployed
0x66C2543F4dF830C313a39972A343403127b2A9EB


New MUMBAI Deployments
Poster
0x345d34E69cC471D87CBaF4c200d2ED1A74071e12

Subgraph:
https://thegraph.com/explorer/subgraph/gallodasballo/opensky


Library Signature
0x38F4133393B163399D76daAd13cd6fdF666A88fA

Twitter Verification
0xeEF73Ad5Cbbe958d851cb05B307eE3aaf36309a0


LINK:
Node:
0xeB8f024BA189B276E6DbBa95CEb05BAc8695281a

Oracle:
0x373ed9E1De6B01ea2e479E012624Bdd01E6fC238


Token:
0x326C977E6efc84E512bB9C30f76E30c160eD06FB



## Chainlink Node

### Mumbai Specific Configuration
ETH_CHAIN_ID=80001
LINK_CONTRACT_ADDRESS=0x326C977E6efc84E512bB9C30f76E30c160eD06FB
ETH_URL=wss://rpc-mumbai.maticvigil.com/ws/v1/YOUR_MATIC_VIGIL_KEY
MINIMUM_CONTRACT_PAYMENT=100000000000000000

### Run the node
```
docker run -p 6688:6688 -v chainlink -it --env-file=.env smartcontract/chainlink:0.10.3
```


## External Adapter
https://github.com/GalloDaSballo/opensky-twitter-verification-cl-ea

Install the external adapter (or deploy it)

## Custom Twitter Verification Job

Set up a bridge that connects to the external adapter

```json
{
  "name": "twitter",
  "initiators": [
    {
      "type": "runlog",
      "params": {
        "address": "YOUR_ORACLE_ADDRESS"
      }
    }
  ],
  "tasks": [
    {
      "type": "twitter"
    },
    {
      "type": "copy",
      "params": {
        "copyPath": [
          "result"
        ]
      }
    },
    {
      "type": "ethbytes32"
    },
    {
      "type": "ethtx"
    }
  ]
}
```