// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../mock/ERC20PermitMock.sol";

contract ERC20PermitFactory {
  event Deployed(address indexed addr, bytes32 salt);

  constructor() {}

  function deploy(bytes32 salt) public returns (address) {
    address addr = address(
      new ERC20PermitMock{ salt: salt }("ERC20PermitMock", "ERC20PermitMock")
    );
    emit Deployed(addr, salt);
    return addr;
  }
}
