import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { Job } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DappService {
  jobList: Job[] = [];
  constructor(private web3: Web3Service) {}

  // Function to retrieve all the jobs written on the blockchain.
  // getAllJobs & getJob functions in smart contract are called from this function.
  // The data from this function is used by home.component.ts

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

  // Function to normalize the data retrieved from the blockchain.
  // input feed comes getJobs function above.
  // data processed and returned to the function for frontend display.

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

  // Function to retrieve the specific details of particular job written on blockchain.
  // getJobDetails function in smart contract is called from this function.
  // The data from this function is used by perf-matrix.component.ts

  async getSpecificJobDetails(jobId: number) {
    const detailsRaw = await this.web3.call('getJobDetails', jobId);
    const detailsNormalized = await this.normalizeJobDetails(detailsRaw);
    return detailsNormalized;
  }

  // Function to normalize the data retrieved from the blockchain.
  // input feed comes getSpecificJobDetails function above.
  // data processed and returned to the function for frontend display.

  private normalizeJobDetails(detailsRaw) {
    return {
      address: detailsRaw[0],
      reward: detailsRaw[1],
    };
  }

  // Function to write Job postings data to blockchain.
  // addJob function in smart contract is the reciever of data from this function.
  // The data in this function is from employer.component.ts

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

  // Function to write Candidate application data to blockchain.
  // addCandidate function in smart contract is the reciever of data from this function.
  // The data in this function is from candidate.component.ts

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

  // Function to retrieve the candidate details of particular job written on blockchain.
  // getCandidate function in smart contract is called from this function.
  // The data from this function is used by home.component.ts

  async getCandidiateApplication(jobId: number) {
    const details = await this.web3.call('getCandidate', jobId);
    const candidateNormalized = await this.normalizeCandidate(details);
    return candidateNormalized;
  }

  // Function to normalize the data retrieved from the blockchain.
  // input feed comes getCandidiateApplication function above.
  // data processed and returned to the function for frontend display.

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

  // Function to write Verified employer details data to blockchain.
  // addVerifiedEmployer function in smart contract is the reciever of data from this function.
  // The data in this function is from admin.component.ts

  createVerifiedEmployer(address: string, name: string) {
    this.web3.executeTransaction('addVerifiedEmployer', address, name);
  }

  // Function to retrieve the verified employer details written on blockchain.
  // getAllVEmployers & getVerifiedEmployer functions in smart contract are called from this function.
  // The data from this function is used by admin.component.ts

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

  // Function to normalize the data retrieved from the blockchain.
  // input feed comes getVEmployers function above.
  // data processed and returned to the function for frontend display.

  normalizeEmployer(empRaw) {
    return {
      id: parseInt(empRaw[0]),
      address: empRaw[1],
      name: empRaw[2],
    };
  }

  // Function to write Performance matrix of a Candidate data to blockchain.
  // addPerfMatrix function in smart contract is the reciever of data from this function.
  // The data in this function is from candidate.component.ts

  perfMatrix(
    candAddress: string,
    vEmpAddress: string,
    enrolledJobId: number,
    evalScore: number
  ) {
    this.web3.executeTransaction(
      'addPerfMatrix',
      vEmpAddress,
      candAddress,
      enrolledJobId,
      evalScore
    );
  }

  // Function to retrieve the performance matrix details of a candidate written on blockchain.
  // getPerfMatrix function in smart contract is called from this function.
  // The data from this function is used by perf-matrix.component.ts

  async getPerfMatrix(jobId: number) {
    const performance = await this.web3.call('getPerfMatrix', jobId);
    const performanceNormalized = await this.normalizePerformance(performance);
    return performanceNormalized;
  }

  // Function to normalize the data retrieved from the blockchain.
  // input feed comes getPerfMatrix function above.
  // data processed and returned to the function for frontend display.

  private normalizePerformance(performance) {
    return {
      candAddress: performance[0],
      vEmpAddress: performance[1],
      enrolledJobId: parseInt(performance[2]),
      evalScore: parseInt(performance[3]),
    };
  }

  // Function to retrieve the current account details of user from metamask.
  // getAccount function in web3 service is called from this function.
  // The data from this function is used by multiple components.

  async getCurrentAccount() {
    const currentAccount = await this.web3.getAccount();
    return currentAccount;
  }

  // Function to recieve the events from web3 service.
  // web3 service retrieve the events from the blockchain.
  
  onEvent(name: string) {
    return this.web3.onEvents(name);
  }
}
