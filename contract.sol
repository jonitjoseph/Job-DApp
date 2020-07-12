pragma solidity ^0.5.16;

contract Students{
    struct students{
        string name;
        string gender;
        uint age;
        string haddress;
        uint groupno;
    }
    
    mapping(uint=>students)  s_id;
    
    function set (uint _rollno, string memory _name, string memory _gender, uint _age, string memory _haddress, uint _groupno) public {
        s_id[_rollno]=students(_name,_gender,_age,_haddress,_groupno);
    }
    
    function get(uint _rollno) public view returns(string memory _name, string memory _gender, uint _age, string memory _haddress, uint _groupno){
        _name = s_id[_rollno].name;
        _gender = s_id[_rollno].gender;
        _age = s_id[_rollno].age;
        _haddress = s_id[_rollno].haddress;
        _groupno = s_id[_rollno].groupno;
        //return ();
    }
}