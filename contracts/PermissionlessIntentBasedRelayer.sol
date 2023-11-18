// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IPermissionlessIntentBasedRelayer.sol";

contract PermissionlessIntentBasedRelayer is IPermissionlessIntentBasedRelayer {
  mapping(address => string) internal relayerMetadataUris;

  /// @inheritdoc IPermissionlessIntentBasedRelayer
  function registerAsRelayer(string memory relayerMetadataUri) external {
    relayerMetadataUris[msg.sender] = relayerMetadataUri;
    emit NewRelayer(msg.sender, relayerMetadataUri);
  }

  /// @inheritdoc IPermissionlessIntentBasedRelayer
  function updateRelayerMetadataUri(
    string memory newRelayerMetadataUri
  ) external {
    relayerMetadataUris[msg.sender] = newRelayerMetadataUri;
    emit RelayerUpdated(msg.sender, newRelayerMetadataUri);
  }

  /// @inheritdoc IPermissionlessIntentBasedRelayer
  function getRelayerMetadataUri(
    address relayer
  ) external view returns (string memory) {
    return relayerMetadataUris[relayer];
  }
}
