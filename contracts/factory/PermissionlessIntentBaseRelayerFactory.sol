// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../PermissionlessIntentBasedRelayer.sol";

contract PermissionlessIntentBasedRelayerFactory {
  event Deployed(address indexed addr, bytes32 salt);

  constructor() {}

  function deploy(bytes32 salt) public returns (address) {
    address addr = address(
      new PermissionlessIntentBasedRelayer{ salt: salt }()
    );
    emit Deployed(addr, salt);
    return addr;
  }
}
