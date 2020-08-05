// SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.7.0;

contract CIEG {
    
  address owner;
  
  constructor() public {
    owner = msg.sender;
  }
  
  struct Candidate {
    uint256 applJobId;
    string name;
    uint256 age;
    string phNumber;
    string qual;
    bool enrolled;
  }

  struct Job {
    address empAddress;
    uint256 id;
    string companyName;
    string jobTitle;
    string location;
    string jobType;
    uint256 reward;
  }
  
  struct PerformanceMatrix {
      address candAddress;
      uint256 enrolledJobId;
      uint256 evalScore;
  }

  mapping(address => Candidate) private candidates;
  mapping(address => PerformanceMatrix) public perfMatrix;
  Job[] private jobs;

  event JobCreated(uint256 _jobId);
  event EnrolledforJob(uint256 _applJobId);
  
  function addCandidate(uint256 _applJobId, string memory _name, uint256 _age, string memory _phNumber, string memory _qual) public {
      candidates[msg.sender] = Candidate(_applJobId, _name, _age, _phNumber, _qual, true);
      emit EnrolledforJob(_applJobId);
  }
  
  function addJob(string memory _companyName, string memory _jobTitle, string memory _location, string memory _jobType, uint256 _reward) public {
      uint256 jobId = jobs.length;

      Job memory newJob = Job({
        empAddress: msg.sender,
        id: jobId,
        companyName: _companyName,
        jobTitle: _jobTitle,
        location: _location,
        jobType: _jobType,
        reward: _reward
      });

      jobs.push(newJob);
      emit JobCreated(jobId);
  }

  function getJob(uint256 _jobId) external view returns(address, uint256, string memory, string memory, string memory, string memory, uint256) {
    require(_jobId < jobs.length && _jobId >=0, "No job found!");
    return(
      jobs[_jobId].empAddress,    
      jobs[_jobId].id,
      jobs[_jobId].companyName,
      jobs[_jobId].jobTitle,
      jobs[_jobId].location,
      jobs[_jobId].jobType,
      jobs[_jobId].reward
    );
  }

  function getAllJobs() external view returns(uint256) {
    return jobs.length;
  }
  
  function getCandidate(address _candidate) external view returns(uint256, string memory, uint256, string memory, string memory, bool) {
    return (
      candidates[_candidate].applJobId,
      candidates[_candidate].name,
      candidates[_candidate].age,
      candidates[_candidate].phNumber,
      candidates[_candidate].qual,
      candidates[_candidate].enrolled
      );
  }

}
