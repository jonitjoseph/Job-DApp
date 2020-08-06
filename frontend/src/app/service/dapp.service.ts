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

  async getSpecificJobDetails(jobId: number) {
    const detailsRaw = await this.web3.call('getJobDetails', jobId);
    const detailsNormalized = await this.normalizeJobDetails(detailsRaw);
    return detailsNormalized;
  }

  private normalizeJobDetails(detailsRaw) {
    return {
      address: detailsRaw[0],
      reward: detailsRaw[1],
    };
  }

  createJob(
    evid: number,
    companyName: string,
    jobTitle: string,
    location: string,
    jobType: string,
    reward: number
  ) {
    this.web3.executeTransaction(
      'addJob',
      evid,
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

  async getCandidiateApplication(jobId: number) {
    const details = await this.web3.call('getCandidate', jobId);
    const candidateNormalized = await this.normalizeCandidate(details);
    return candidateNormalized;
  }

  private normalizeCandidate(details) {
    return {
      jobId: parseInt(details[0]),
      candAddress: details[1],
      name: details[2],
      age: parseInt(details[3]),
      phone: details[4],
      qual: details[5],
    };
  }

  createVerifiedEmployer(address: string, name: string) {
    this.web3.executeTransaction('addVerifiedEmployer', address, name);
  }

  async getVEmployers() {
    const vEmployers: any = [];
    const totalEmployers = await this.web3.call('getAllVEmployers');
    for (let i = 0; i < totalEmployers; i++) {
      const empRaw = await this.web3.call('getVerifiedEmployer', i);
      const empNormalized = this.normalizeEmployer(empRaw);
      vEmployers.push(empNormalized);
    }
    return vEmployers;
  }

  normalizeEmployer(empRaw) {
    return {
      id: parseInt(empRaw[0]),
      address: empRaw[1],
      name: empRaw[2],
    };
  }

  perfMatrix(
    candAddress: string,
    vEmpAddress: string,
    enrolledJobId: number,
    evalScore: number
  ) {
    this.web3.executeTransaction(
      'addPerfMatrix',
      candAddress,
      vEmpAddress,
      enrolledJobId,
      evalScore
    );
  }

  async getPerfMatrix(jobId: number) {
    const performance = await this.web3.call('getPerfMatrix', jobId);
    const performanceNormalized = await this.normalizePerformance(performance);
    return performanceNormalized;
  }

  private normalizePerformance(performance) {
    return {
      candAddress: performance[0],
      vEmpAddress: performance[1],
      enrolledJobId: parseInt(performance[2]),
      evalScore: parseInt(performance[3]),
    };
  }

  async getCurrentAccount() {
    const currentAccount = await this.web3.getAccount();
    return currentAccount;
  }

  onEvent(name: string) {
    return this.web3.onEvents(name);
  }
}
