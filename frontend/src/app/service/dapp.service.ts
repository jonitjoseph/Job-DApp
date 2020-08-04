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
      id: parseInt(jobRaw[0]),
      companyName: jobRaw[1],
      jobTitle: jobRaw[2],
      location: jobRaw[3],
      jobType: jobRaw[4],
      reward: parseInt(jobRaw[5]),
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

  async createJob(
    companyName: string,
    jobTitle: string,
    location: string,
    jobType: string,
    reward: number
  ) {
    const acc = await this.web3.getAccount();
    localStorage.setItem('address', acc);
    localStorage.setItem('type', 'employer');
    this.web3.executeTransaction(
      'addJob',
      companyName,
      jobTitle,
      location,
      jobType,
      reward
    );
  }

  async candidateApplication(
    jobId: number,
    name: string,
    age: number,
    phNumber: number,
    qualification: string
  ) {
    const acc = await this.web3.getAccount();
    const existingAddress = localStorage.getItem('address');
    const existingType = localStorage.getItem('type');
    if (existingAddress === acc && existingType === 'employer') {
      alert('Employer cannot enroll for job!');
      console.log('Employer cannot enroll for job!');
    } else {
      localStorage.setItem('address', acc);
      localStorage.setItem('type', 'candidate');
      this.web3.executeTransaction(
        'addCandidate',
        jobId,
        name,
        age,
        phNumber,
        qualification
      );
    }
  }

  onEvent(name: string) {
    return this.web3.onEvents(name);
  }
}
