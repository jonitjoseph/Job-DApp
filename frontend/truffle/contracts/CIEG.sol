// SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.7.0;

contract CIEG {
    
  address owner;
  
  constructor() public {
    owner = msg.sender;
  }
  
  struct Candidate {
    address applCandAddress;
    uint256 applJobId;
    uint256 age;
    string name;
    string phNumber;
    string qual;
  }

  struct Job {
    address empAddress;
    uint256 id;
    uint256 reward;
    string companyName;
    string jobTitle;
    string location;
    string jobType;
    bool status;
  }

  struct VerifiedEmployer {
    address verifiedEmpAddress;
    uint256 id;
    string verifiedEmpName;
  }

  struct PerformanceMatrix {
    address candAddress;
    address vEmpAddress;
    uint256 enrolledJobId;
    uint256 evalScore;
  }

  mapping(uint256 => Candidate) private candidates;
  mapping(uint256 => PerformanceMatrix) private perfMatrix;
  Job[] private jobs;
  VerifiedEmployer[] private verifiedEmployers;

  event JobCreated(uint256 _jobId);
  
  modifier owner_disallow() {
    require(msg.sender != owner, "Owner cannot enroll");
    _;
  }
  
  modifier only_owner() {
      require(msg.sender == owner, "Owners only can add verified employers");
      _;
  }

  modifier verified_employer(uint256 _evid) {
      require(_evid == verifiedEmployers[_evid].id, "Employer Id doesnot match!");
      require(msg.sender == verifiedEmployers[_evid].verifiedEmpAddress, "Not a verified employer!");
      _;
  }
  
  function addVerifiedEmployer(address _empAddress, string memory _empName) public only_owner {
      uint256 empVId = verifiedEmployers.length;
      
      VerifiedEmployer memory newVEmp = VerifiedEmployer({
          id: empVId,
          verifiedEmpAddress: _empAddress,
          verifiedEmpName: _empName
      });
      verifiedEmployers.push(newVEmp);
  }

  function addPerfMatrix(address _vEmpAddress, address _candAddress, uint256 _enrolledJobId, uint256 _evalScore) public {
      require(msg.sender == _vEmpAddress, "Employer only can add Performance Matrix!");
      uint256 enrldJobId = _enrolledJobId;
      perfMatrix[enrldJobId] = PerformanceMatrix(_vEmpAddress, _candAddress, _enrolledJobId, _evalScore);
  }
 
  function addCandidate(uint256 _applJobId, string memory _name, uint256 _age, string memory _phNumber, string memory _qual) public owner_disallow {
        uint256 applJob = _applJobId;
        require(jobs[_applJobId].status == true, "No active intakes");
        candidates[applJob] = Candidate(msg.sender, _applJobId, _age, _name, _phNumber, _qual);
        changeJobStatus(_applJobId);
  }
  
  function addJob(uint256 _evid, string memory _companyName, string memory _jobTitle, string memory _location, string memory _jobType, uint256 _reward) public owner_disallow verified_employer(_evid){
      uint256 jobId = jobs.length;

      Job memory newJob = Job({
        empAddress: msg.sender,
        id: jobId,
        reward: _reward,
        companyName: _companyName,
        jobTitle: _jobTitle,
        location: _location,
        jobType: _jobType,
        status: true
      });

      jobs.push(newJob);
      emit JobCreated(jobId);
  }
  
  function changeJobStatus(uint256 _jobId) public {
      jobs[_jobId].status = false;
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

  function getJobDetails(uint256 _jobId) external view returns(address, uint256) {
    return(
      jobs[_jobId].empAddress,
      jobs[_jobId].reward    
    );
  }

  function getAllJobs() external view returns(uint256) {
    return jobs.length;
  }
  
  function getCandidate(uint256 _candidate) external view returns(uint256, address, string memory, uint256, string memory, string memory) {
    return (
      candidates[_candidate].applJobId,
      candidates[_candidate].applCandAddress,
      candidates[_candidate].name,
      candidates[_candidate].age,
      candidates[_candidate].phNumber,
      candidates[_candidate].qual
      );
  }
  
  function getAllVEmployers() external view returns(uint256) {
      return verifiedEmployers.length;
  }
  
  function getVerifiedEmployer(uint256 _empVId) external view returns(uint256, address, string memory) {
    require(_empVId < verifiedEmployers.length && _empVId >=0, "No verified employers found!");
    return(
        verifiedEmployers[_empVId].id,
        verifiedEmployers[_empVId].verifiedEmpAddress,
        verifiedEmployers[_empVId].verifiedEmpName
    );
  }

  function getPerfMatrix(uint256 _jobId) external view returns(address, address ,uint256, uint256) {
    return (
        perfMatrix[_jobId].candAddress,
        perfMatrix[_jobId].vEmpAddress,
        perfMatrix[_jobId].enrolledJobId,
        perfMatrix[_jobId].evalScore
    );
  }

}
