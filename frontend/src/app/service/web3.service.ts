import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

// This web3 services is the bridge between the blockchain and frontend.

declare let window: any;
const contractJSON = require('../../../truffle/build/contracts/CIEG.json');
const contractAddress = contractJSON.networks['5777'].address;
const contractAbi = contractJSON.abi;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3: Web3;
  private contract: Contract;
  private account: any = null;
  private enable: any;

  constructor() {
    // Checking if the window contains the web3 injected by the web browser
    // Metamask injects web3 if installed.
    // window.ethereum will be injected by metamask in future.
    // Switch to window.ethereum if needed.
    if (window.web3) {
      // this.web3 = new Web3(window.ethereum);
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
      this.contract = new this.web3.eth.Contract(contractAbi, contractAddress);
      this.enable = this.enableMetaMaskAccount();
      // window.ethereum.enable().catch((err) => {
      //   console.log(err);
      // });
    } else {
      console.log('Metamask not Found! Install or Enable Metamask.');
      alert('Metamask not Found! Install or Enable Metamask.');
    }
  }

  // Request access to users account

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
    });
    return Promise.resolve(enable);
  }

  // Retrieve the selected account

  public async getAccount(): Promise<string> {
    console.log('web3.service / getAccount / start');
    if (this.account == null) {
      this.account = (await new Promise((resolve, reject) => {
        console.log('web3.service / getAccount / eth');
        console.log(window.web3.eth);
        window.web3.eth.getAccounts((err, retAccount) => {
          console.log('web3.service / getAccount / retAccount');
          console.log(retAccount);
          localStorage.setItem('currentUser', retAccount);
          if (retAccount.length > 0) {
            this.account = retAccount[0];
            resolve(this.account);
          } else {
            alert('web3.service / getAccount / no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            alert('web3.service / getAccount / error retrieving account');
            reject('Error retrieving account');
          }
        });
      })) as Promise<any>;
    }
    return Promise.resolve(this.account);
  }

  // Function to execute any transaction on blockchain. 
  // All functions which involves writing to blockchain pass through this generic function.

  async executeTransaction(fnName: string, ...args: any[]): Promise<any> {
    const acc = await this.getAccount();
    console.log(acc);
    this.contract.methods[fnName](...args)
      .send({ from: acc, gas: 6000000 })
      .on('transactionHash', (hash) => {
        console.log('Successful Transaction!',hash);
      })
      .on('error', (error) => {
        console.log(error.message);
        alert(error.message);
        console.log('Transaction Unsuccessfull!');
      });
  }

  // Function to call from a blockchain.
  // All functions involving retrieving the data from blockchain pass through this generic function.

  async call(fnName: string, ...args: any[]) {
    const acc = await this.getAccount();
    return this.contract.methods[fnName](...args).call({ from: acc });
  }

  // Function to recieve events happening on a blockchain.
  // All events from the blockchain pass through this generic function. 

  onEvents(event: string) {
    return new Observable((observer) => {
      this.contract.events[event]().on('data', (data) => {
        observer.next({
          event: data.event,
          payload: data.returnValues,
        });
      });
    });
  }
}
