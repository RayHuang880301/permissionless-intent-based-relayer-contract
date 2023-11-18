// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPermissionlessIntentBasedRelayer {
  event NewRelayer(address indexed relayer, string relayerMetadataUri);
  event RelayerUpdated(address indexed relayer, string newRelayerMetadataUri);

  function registerAsRelayer(string memory relayerMetadataUri) external;
  function updateRelayerMetadataUri(
    string memory newRelayerMetadataUri
  ) external;
  function getRelayerMetadataUri(
    address relayer
  ) external view returns (string memory);
}
