import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { Job } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DappService {
  jobList: Job[] = [];
  constructor(private web3: Web3Service) {}

  async getJobs(): Promise<Job[]> {
    const jobs: Job[] = [];
    const totalJobs = await this.web3.call('getAllJobs');
    const acc = await this.web3.getAccount();
    for (let i = 0; i < totalJobs; i++) {
      const jobRaw = await this.web3.call('getJob', i);
      const jobNormalized = this.normalizeJob(jobRaw);
      jobs.push(jobNormalized);
    }
    return jobs;
  }

  private normalizeJob(jobRaw): Job {
    return {
      address: jobRaw[0],
      id: parseInt(jobRaw[1]),
      companyName: jobRaw[2],
      jobTitle: jobRaw[3],
      location: jobRaw[4],
      jobType: jobRaw[5],
      reward: parseInt(jobRaw[6]),
    };
  }

  async getNumofJobs() {
    const totalJobs = await this.web3.call('getAllJobs');
    console.log(totalJobs);
    for (let i = 0; i < totalJobs; i++) {
      const job = await this.web3.call('getJob', i);
      console.log(job);
      this.jobList.push(job);
    }
    return this.jobList;
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

  candidateApplication(
    jobId: number,
    name: string,
    age: number,
    phNumber: number,
    qualification: string
  ) {
    this.web3.executeTransaction(
      'addCandidate',
      jobId,
      name,
      age,
      phNumber,
      qualification
    );
  }

  async getCurrentAccount() {
    const currentAccount = await this.web3.getAccount();
    return currentAccount;
  }

  onEvent(name: string) {
    return this.web3.onEvents(name);
  }
}
