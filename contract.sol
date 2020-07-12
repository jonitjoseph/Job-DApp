pragma solidity ^0.5.16;

contract CIEG {
    
    struct student{
        string name;
        string gender;
        uint age;
        string haddress;
    }
    
    mapping(uint=>student)  s_id;
    
    function set (uint _slno, string memory _name, string memory _gender, uint _age, string memory _haddress) public {
        s_id[_slno]=student(_name,_gender,_age,_haddress);
    }
    
    function get(uint _slno) public view returns(string memory _name, string memory _gender, uint _age, string memory _haddress){
        _name = s_id[_slno].name;
        _gender = s_id[_slno].gender;
        _age = s_id[_slno].age;
        _haddress = s_id[_slno].haddress;
    }
}