pragma solidity >= 0.5.0 < 0.7.0;

contract CIEG {
    
  address owner;
  
  constructor() public {
    owner = msg.sender;
  }

  uint256 perfMatrix;
  struct Candidate {
    string name;
    uint256 age;
    string instName;
    string aNumber;
    string phNumber;
    string email;
    string qual;
  }

  struct Job {
    string companyName;
    string jobTitle;
    string category;
    string location;
    string ldate;
    string jobType;
    uint256 reward;
  }

  mapping(address => Candidate) public candidates;
  mapping(uint => Job) public jobs;
  
  function addCandidate(string memory _name, uint256 _age, string memory _instName, string memory _aNumber, string memory _phNumber, string memory _email, string memory _qual) public {
      candidates[msg.sender] = Candidate(_name, _age, _instName, _aNumber, _phNumber, _email, _qual);
  }
  
  function addJob(uint _id, string memory _companyName, string memory _jobTitle, string memory _category, string memory _location, string memory _ldate, string memory _jobType, uint256 _reward) public {
      jobs[_id] = Job(_companyName, _jobTitle, _category, _location, _ldate, _jobType, _reward);
  }

}
