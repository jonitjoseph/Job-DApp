pragma solidity ^0.5.16;

contract CIEG {
    
    // struct userType{
    //     string name;
    //     string gender;
    //     uint age;
    //     string haddress;
    // }
    
    // mapping(uint=>student)  s_id;
    
    // function set (uint _slno, string memory _name, string memory _gender, uint _age, string memory _haddress) public {
    //     s_id[_slno]=student(_name,_gender,_age,_haddress);
    // }
    
    // function get(uint _slno) public view returns(string memory _name, string memory _gender, uint _age, string memory _haddress){
    //     _name = s_id[_slno].name;
    //     _gender = s_id[_slno].gender;
    //     _age = s_id[_slno].age;
    //     _haddress = s_id[_slno].haddress;
    // }

    enum Status { 
      Available,
      Applied,
      Accepted
    }
    // enum UserType{
    //     Student,
    //     Employer,
    //     Sponsor
    // }
    
    address public JobProvider;
    string public JobDescription;
    uint256 public JobReward;
    uint256 public JobApplicationDeadline;
    Status public JobStatus;
    
    address public Candidate;
    uint256 public Application;
    
    constructor(string memory job_description, uint256 job_reward, uint256 job_application_deadline) public
    {
        JobProvider = msg.sender;
        JobReward = job_reward;
        JobDescription = job_description;
        JobApplicationDeadline = now + job_application_deadline * 1 minutes;
        // find out how to replace the above line with timeout.
        JobStatus = Status.Available;
    }
    
    modifier job_application_condition(){
        require (now <= JobApplicationDeadline,"Inactive");
        require(msg.sender != JobProvider, "Job Provider cannot apply!");
        // require(msg.sender !=);
        _;
    }
    
    modifier job_application_accept(){
        require(msg.sender == JobProvider, "Job Provider only can accept");
        _;
    }
    
    function ApplyJob(uint256 _application) public job_application_condition
    {
        Candidate = msg.sender;
        Application = _application;
        JobStatus = Status.Applied;
    }
    
    function AcceptJob() public job_application_accept
    {
        JobStatus = Status.Accepted;
    }
    
}