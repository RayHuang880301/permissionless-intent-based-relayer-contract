import {HardhatRuntimeEnvironment} from 'hardhat/types';
import { utils } from "ethers";
import type {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const {deployments, getNamedAccounts} = hre;
	const {deploy, execute} = deployments;

	const Factory = await deployments.getOrNull('PermissionlessIntentBasedRelayerFactory');
	const {deployer} = await getNamedAccounts();

  if (!Factory) {
    await deploy('PermissionlessIntentBasedRelayerFactory', {
      from: deployer,
      log: true,
      // speed up deployment on local network (ganache, hardhat), no effect on live networks
      autoMine: true,
    });

    const receipt = await execute(
      'PermissionlessIntentBasedRelayerFactory',
      {
        from: deployer,
        maxFeePerGas: utils.parseUnits('0.01', 'gwei'),
      },
      'deploy',
      utils.defaultAbiCoder.encode(["bytes32"], ["0x0000000000000000000000000000000000000000000000000000000000000001"]),
    );
    console.log(receipt);
  }
}

export default func;
func.tags = ['ERC20Permit'];
module.exports.dependencies = ['ERC20PermitFactory'];
