pragma solidity ^0.5.16;

contract Students{
    struct students{
        string name;
        string gender;
        uint age;
        string haddress;
        uint groupno;
    }
    
    mapping(uint=>students)  rollno;
    
    function set (uint _rollno, string memory _name, string memory _gender, uint _age, string memory _haddress, uint _groupno) public {
        rollno[_rollno]=students(_name,_gender,_age,_haddress,_groupno);
    }
    
    function get(uint _rollno) public view returns(string memory _name, string memory _gender, uint _age, string memory _haddress, uint _groupno){
        _name = rollno[_rollno].name;
        _gender = rollno[_rollno].gender;
        _age = rollno[_rollno].age;
        _haddress = rollno[_rollno].haddress;
        _groupno = rollno[_rollno].groupno;
        //return ();
    }
}