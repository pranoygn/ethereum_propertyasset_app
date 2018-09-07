pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract PropertyDocHash {

  /* mapping field below is equivalent to an associative array or hash. 
  key < 32 bytes so its datatype is bytes32 and hashValue > 32 bytes 
  so its datatype is string */

  mapping (bytes32 => string) public hashArr;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. Currently its an empty 
  */

  function FileHash() { }

  /* key can be either PropertyID, Filename and hashValue can be IPFS hash or 
  an any generated hash. hashArr stores the key mapped to hashValue */

  function setHash(bytes32 key, string hashValue) {
    hashArr[key] = hashValue;
  }

  /* This function returns the hash value mapped to the key */
  function getHash(bytes32 key) returns (string) {
    return hashArr[key];
  }
}
