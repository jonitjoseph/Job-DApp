# CIEG-JobDApp

Credit Incentive Employment Generation (CIEG) is a simple DApp built on Ethereum blockchain. DApp aims to implement a public employment record management system which connects students with employers. Various functionalities include posting a job requirement, applying for the same by a candidate or a student, adding a performance matrix, keeping track of the reward the job provider passed to candidate and many more. The platform makes the necessary details available so that another potential job provider can have a history of the performance matrix of the candidate for the particular job that he/she enrolled for.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Requirements

- [NodeJS v12](https://nodejs.org/en/)
- [Angular CLI v9](https://angular.io/)
- [Truffle](https://www.trufflesuite.com/)
- [Ganache CLI](https://www.npmjs.com/package/ganache-cli) / [Ganache application](https://www.trufflesuite.com/ganache)
- [Metamask](https://metamask.io/)

### Installation

- Check if you have NodeJS installed on your system by going to the terminal and then type the following into a terminal:
````
node -v
````
NPM usually comes with NodeJS but to verify,
````
npm -v
````
- Check if you have Angular CLI installed by typing,
````
ng --version
````
- To clone the project to a local directory,
````
git clone
````
- To install the necessary node module for the project to run,
````
npm install
````

### Truffle

To try out the DApp in local environment either open Ganache Application or run the following command in a new terminal:
````
ganache-cli
````
>Leave this terminal running for completing the following steps to run the application locally.

- After installation of node modules change current working directory to truffle where the project is located,
````
cd truffle
````
- To compile the Truffle project,
````
truffle compile
````
- To migrate the Truffle project,
````
truffle migrate
````

### GETH

Find geth folder in docs.

### Ropsten

This project has been deployed to the Ropsten testnet. Find it using the below link.

https://ropsten.etherscan.io/address/0xABc8962a4AF189BEFb1765B52BBa3E39Caf785Fb

### Running DApp

- After successful migration change to the root of the directory where the project is located and then type the following into a terminal:
````
ng serve --open
````
The browser will open to http://localhost:4200 by default where the DApp will be running.

## Running the tests

To test the smart contract open the truffle directory in a new terminal and type the following,
````
truffle develop
````
This will open a smart contract testing ground with 10 dummy Ethereum accounts loaded with 100 ether each. It will now be a working development terminal, 

**truffle develop>**

where you just have to type the following,
````
test
````
## Deployment
The project has been deployed to the testnet and can be found using the following link to etherscan.io

## Built With

- Angular v9.1.1
- Angular Material v9.2.4
- Web3 v1.2.10

## Author
CEDB4G08