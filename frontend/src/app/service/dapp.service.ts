import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { Job } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DappService {
  constructor(private web3: Web3Service) {}

  async getJobs(){
    const jobs: Job[] =[];
    const totalJobs = await this.web3.call('getAllJobs');
    console.log(totalJobs);
    for(let i=0;i<totalJobs;i++){
      const job = await this.web3.call('getJob',i);
      jobs.push(job);
    }
    return jobs;


    const acc = await this.web3.getAccount();
    console.log(acc);
  }

  createJob(
    companyName: string,
    jobTitle: string,
    location: string,
    jobType: string,
    reward: number
  ) {
    this.web3.executeTransaction(
      'addJob',
      companyName,
      jobTitle,
      location,
      jobType,
      reward
    );
  }

  onEvent(name:string){
    return this.web3.onEvents(name);
  }
}
