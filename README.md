# OpenSky, decentralized, uncensorable CMS for your blog

This is a monorepo for the PandoraCMS website, containing:

## hardhat
The contracts, with tests and tasks to publish new content, using Solidity Template

## next
The UI for the website, to interact with the protocol and publish new content, using NextJS

## subgraph
The subgraph code to track new posts, using TheGraph

## Deploy your own blog

Docker image to set up a server to deploy new dencetralized blogs, done to help onboard new authors

https://github.com/GalloDaSballo/pandoracms-deploy-docker

## Default Blog Template
A CRA Application, build it while injecting REACT_APP_AUTHOR_ADDRESS to set up your own blog
(Or use the deploy repo to deploy it)

https://github.com/GalloDaSballo/pandoracms-default-template



## Local Blog Testing

## Run a hardhat localhost node
yarn localnode

## Deploy the contract to localhost
yarn deploy --network localhost 

### Publish a new post via the PublishPost task

yarn hardhat PublishPost --network localhost
