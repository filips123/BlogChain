![BlogChain Logo](https://vectr.com/filips123/b1Bzz8jXxa.png?width=500&height=100&select=b1Bzz8jXxapage0)

BlogChain
=========
A decentralized blockchain based blog using Ethereum Smart Contract and Web3.

## Description
A decentralized blockchain based blog using [Ethereum Smart Contract](https://www.ethereum.org) and [Web3](https://github.com/ethereum/web3.js). It uses the [Truffle Framework](http://truffleframework.com) for developing smart contracts and [Bootstrap](https://getbootstrap.com) for a website. It uses [IPFS](https://ipfs.io) for web hosting.

### Features
- Decentralized
- Can be used with any Ethereum network
- Uses IPFS for website hosting
- Small file size
- *more features coming ...*

### TODO
- [ ] Deleting and editing posts
- [ ] Deleting and transfering a blog
- [ ] Translations
- [ ] Better tests
- [ ] Better code documentation
- [ ] JavaScript API

## How It Works
TODO

## Usage
You can run BlogChain locally, or publish it to the [IPFS](https://ipfs.io) or another hosting.

### Requirements
You must have [Node.js](https://nodejs.org) and [NPM](https://www.npmjs.com) installed. You also need to install [Truffle Framework](http://truffleframework.com).
You must be connected to the Ethereum blockchain to use the tests. I suggest you use [Ganache](http://truffleframework.com/ganache), which creates a personal Ethereum blockchain.
For web hosting, you can use [IPFS](https://ipfs.io).

### Installation
You can install BlogChain from the GitHub repository using `git`, or download it from the [GitHub releases](https://github.com/filips123/BlogChain/releases).
Then you need to download all additional NPM packages. BlogChain is currently using `lite-server` for a local web development server.

```bash
git clone https://github.com/filips123/BlogChain.git
cd BlogChain
npm install
```

### Running
If you want to compile smart contracts, execute the following commands:
```bash
truffle compile
```
Compiled smart contracts will be in the `build/contracts` folder.

If you want to test BlogChain, execute the following commands:
```bash
truffle test
# or
npm test
```
You must be connected to the Ethereum blockchain for that. I suggest you use [Ganache](http://truffleframework.com/ganache).

To use the `lite-server` for a local web development server, execute the following commands:
```bash
npm run dev
```
This will compile smart contracts and run a local web server on port 3000.

### Publishing to IPFS
You can publish BlogChain website to the [IPFS](https://ipfs.io). You need to install it and add it to the `path` variable. Instructions are for IPFS added in `path` variable. If you don't have IPFS added in `path` variable, you will need to modify commands.

To do this, you need to copy the compiled BlogChain smart contract (`build/contracts/BlogChain.json`) and the webpage (`src`) into the same folder. You need to do this manually right now.

Then follow the instructions in the Medium article [The ultimate end-to-end tutorial to create and deploy a fully decentralized Dapp in ethereum](https://medium.com/@merunasgrincalaitis/the-ultimate-end-to-end-tutorial-to-create-and-deploy-a-fully-descentralized-dapp-in-ethereum-18f0cf6d7e0e#6513) (don't forget to change folder name). Bellow is their summary.

Execute the following commands:
```bash
ipfs daemon
```
This will create a node. In another command line or terminal do:
```bash
ipfs swarm peers
```
This will get you peers that will share your content. Then run:
```bash
ipfs add -r path/to/website/and/compiled/contract/directory/
```
This will add your folder to the network. You’ll see a long hash that’s been generated for you. The last hash is a unique identifier for that folder:
```
added QmcCZLY7ubZ7pb5hkwSMzazNGkrJpfsHidiEwAi9ep9s7b website/css
added QmPboMFyB7p1rsjcEA8W9TfcQfkUeBhubZQDYPUVtnmXWF website/icons
added QmQGMa9EFZZ29qoL8SnaFcFmY32QKHC7GixxaEyw63aKHv website/js
added Qma1PfCMzemunU9wCTZHCMo6BfgGbMZ1Q3gXpaZTa6uY64 website
```
Copy that last hash (for example `Qmc73ZkESUP9sZyU4zGgDMQajfNVLqqKdxPut9GmvStjtJ`) and execute:
```bash
ipfs name publish your-last-hash
```
You’ll get something like this:
```
Published to Qmc2LMjSaXPFRvPJCCb4EfctYNLsKE1WTJC7BMxLrN9fmD: /ipfs/Qmc73ZkESUP9sZyU4zGgDMQajfNVLqqKdxPut9GmvStjtJ
```
That means that your website is available on the URL from the first hash (for example `Qmc2LMjSaXPFRvPJCCb4EfctYNLsKE1WTJC7BMxLrN9fmD`. You can check it by going to `https://gateway.ipfs.io/ipns/<your-hash-here>`.
In my case this is:
```
https://gateway.ipfs.io/ipns/Qmc2LMjSaXPFRvPJCCb4EfctYNLsKE1WTJC7BMxLrN9fmD
```

If you update BlogChain contract or website files, you can simply run:
```bash
ipfs add -r path/to/website/and/compiled/contract/directory/
ipfs name publish your-last-hash
```
The publish name hash will always be the same.

### Configuration
You can configure Truffle in file [truffle-config.js](https://github.com/filips123/BlogChain/blob/master/truffle-config.js). For more details about configuring Truffle see [Truffle Documentation](http://truffleframework.com/docs/advanced/configuration).

*More options are comming ...*

## Built With
- [Ethereum](https://www.ethereum.org)
- [Truffle Framework](http://truffleframework.com)
- [Web3](https://github.com/ethereum/web3.js)
- [Bootstrap](https://getbootstrap.com)
- [IPFS](https://ipfs.io)

## Contributing
Please read [CONTRIBUTING.md](https://github.com/filips123/BlogChain/blob/master/CONTRIBUTING.md) for details.

## Versioning
This project uses [SemVer](http://semver.org) SemVer for versioning. For the versions available, see the [tags on this repository](https://github.com/filips123/BlogChain/tags).

## License
This project is licensed under the GNU General Public License v3. See the [LICENSE](https://github.com/filips123/BlogChain/blob/master/LICENSE) file for details.
