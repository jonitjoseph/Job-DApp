// SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.7.0;

/// @title Credit Incentive Employment Generation, DApp Job/Internship portal
/// @author CEDB4G08
/// @notice This contract can be used to post jobs, recruit willing candidates and more.
/// @dev All function calls are currently implemented without side effects 

contract CIEG {
    
  /// @notice A variable for storing owner address  
  address owner;
  /// @notice Constructor for retrieving the owner address 
  constructor() public {
    owner = msg.sender;
  }
  /// @notice Structure for storing candidate details
  struct Candidate {
    address applCandAddress;
    uint256 applJobId;
    uint256 age;
    string name;
    string phNumber;
    string qual;
  }
  /// @notice Structure for storing job details
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
  /// @notice Structure for storing verified employer details
  struct VerifiedEmployer {
    address verifiedEmpAddress;
    uint256 id;
    string verifiedEmpName;
  }
  /// @notice Structure for storing performance matrix of a candidate
  struct PerformanceMatrix {
    address candAddress;
    address vEmpAddress;
    uint256 enrolledJobId;
    uint256 evalScore;
  }
  /// @notice Mapping candidates to number 
  mapping(uint256 => Candidate) private candidates;
  /// @notice Mapping performance matrix to number 
  mapping(uint256 => PerformanceMatrix) private perfMatrix;
  /// @notice Creating array to store jobs 
  Job[] private jobs;
  /// @notice Creating array to store verified employers 
  VerifiedEmployer[] private verifiedEmployers;
  /// @notice Event for job creation 
  event JobCreated(uint256 _jobId);
  /// @notice Modifier to disallow owners from accessing specific functions 
  modifier owner_disallow() {
    require(msg.sender != owner, "Owner cannot enroll");
    _;
  }
  /// @notice Modifier to allow owners to access specific functions 
  modifier only_owner() {
      require(msg.sender == owner, "Owners only can add verified employers");
      _;
  }
  /// @notice Modifier to allow only verified employers to access specific functions 
  modifier verified_employer(uint256 _evid) {
      require(_evid == verifiedEmployers[_evid].id, "Employer Id doesnot match!");
      require(msg.sender == verifiedEmployers[_evid].verifiedEmpAddress, "Not a verified employer!");
      _;
  }
  /// @notice Function to add verified employer
  /// @param _empAddress recieve employer address
  /// @param _empName recieve employer name
  function addVerifiedEmployer(address _empAddress, string memory _empName) public only_owner {
      uint256 empVId = verifiedEmployers.length;
      
      VerifiedEmployer memory newVEmp = VerifiedEmployer({
          id: empVId,
          verifiedEmpAddress: _empAddress,
          verifiedEmpName: _empName
      });
      verifiedEmployers.push(newVEmp);
  }
  /// @notice Function to add performance matrix of a candidate
  /// @param _vEmpAddress recieve verified employer address
  /// @param _candAddress recieve candidate address
  /// @param _enrolledJobId recieve enrolled job id of the candidate
  /// @param _evalScore recieve the performance matrix score
  /// @dev require the employer to be the msg sender to ensure valid input
  function addPerfMatrix(address _vEmpAddress, address _candAddress, uint256 _enrolledJobId, uint256 _evalScore) public {
      require(msg.sender == _vEmpAddress, "Employer only can add Performance Matrix!");
      uint256 enrldJobId = _enrolledJobId;
      perfMatrix[enrldJobId] = PerformanceMatrix(_vEmpAddress, _candAddress, _enrolledJobId, _evalScore);
  }
  /// @notice Function to add a candidate to a job
  /// @param _applJobId recieve the job id of the job which candidate applied to
  /// @param _name recieve the name of the candidate
  /// @param _age recieve the age of the candidate
  /// @param _phNumber recieve the phone number of the candidate
  /// @param _qual recieve the qualifications of the candidate
  /// @dev require the job status to be true for intake
  function addCandidate(uint256 _applJobId, string memory _name, uint256 _age, string memory _phNumber, string memory _qual) public owner_disallow {
        uint256 applJob = _applJobId;
        require(jobs[_applJobId].status == true, "No active intakes");
        candidates[applJob] = Candidate(msg.sender, _applJobId, _age, _name, _phNumber, _qual);
        changeJobStatus(_applJobId);
  }
  /// @notice Function to add a job by verified employer
  /// @param _evid recieve employers verification id
  /// @param _companyName recieve the company name
  /// @param _jobTitle recieve the job title
  /// @param _location recieve the location of the job
  /// @param _jobType recieve the jobtype
  /// @param _reward recieve the reward promised for the job
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
  /// @notice Function which is used internally to change the job status
  /// @param _jobId recieve the job id for which the status should be changed
  function changeJobStatus(uint256 _jobId) public {
      jobs[_jobId].status = false;
  }
  /// @notice Function to retrieve the job details
  /// @param _jobId recieve the job id for which the details should be retrieved
  /// @dev require jobid to be between 0 and total length
  /// @return empAddress returns the employer address
  /// @return id returns the job id
  /// @return companyName returns the company name
  /// @return jobTitle returns the job title
  /// @return location returns the location of the job
  /// @return jobType returns the job type
  /// @return reward returns the reward for the job
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
  /// @notice Function to retrieve specific job details 
  /// @param _jobId recieve the job id for which the details should be retrieved
  /// @return empAddress returns the employer address
  /// @return reward returns the reward for the job
  function getJobDetails(uint256 _jobId) external view returns(address, uint256) {
    return(
      jobs[_jobId].empAddress,
      jobs[_jobId].reward    
    );
  }
  /// @notice Function to retrieve the total number of jobs
  /// @return number of jobs written in blockchain
  function getAllJobs() external view returns(uint256) {
    return jobs.length;
  }
  /// @notice Function to retrieve the candidate details 
  /// @param _candidate recieve the candidate for which the information to be retrieved
  /// @return applJobId returns the applied job id
  /// @return applCandAddress returns the address of the candidate applied for the job
  /// @return name returns the name of the candidate
  /// @return age returns the age of the candidate
  /// @return phNumber returns the phone number of teh candidate
  /// @return qual returns the qualification of the candidate
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
  /// @notice Function to retrieve the total number of verified employers
  /// @return number of verified employers 
  function getAllVEmployers() external view returns(uint256) {
      return verifiedEmployers.length;
  }
  /// @notice Function to retrieve the verified employer
  /// @param _empVId recieves the employer verification id to retrieve particular employer
  /// @dev require the employer id to be between 0 and total number
  /// @return id returns the id of employer
  /// @return verifiedEmpAddress returns the verified employer address
  /// @return verifiedEmpName returns the verified employer name
  function getVerifiedEmployer(uint256 _empVId) external view returns(uint256, address, string memory) {
    require(_empVId < verifiedEmployers.length && _empVId >=0, "No verified employers found!");
    return(
        verifiedEmployers[_empVId].id,
        verifiedEmployers[_empVId].verifiedEmpAddress,
        verifiedEmployers[_empVId].verifiedEmpName
    );
  }
  /// @notice Function to retrieve the performance matrix of the candidate
  /// @param _jobId recieves the job id for which the candidate enrolled
  /// @return candAddress returns the candidate address
  /// @return vEmpAddress returns the verified employer address
  /// @return enrolledJobId returns the enrolled job id
  /// @return evalScore returns the evaluation score of candidate
  function getPerfMatrix(uint256 _jobId) external view returns(address, address ,uint256, uint256) {
    return (
        perfMatrix[_jobId].candAddress,
        perfMatrix[_jobId].vEmpAddress,
        perfMatrix[_jobId].enrolledJobId,
        perfMatrix[_jobId].evalScore
    );
  }

}
