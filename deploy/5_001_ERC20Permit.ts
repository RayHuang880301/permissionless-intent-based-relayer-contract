import fs from "fs";
import path from "path";
import { utils } from "ethers";
import type {HardhatRuntimeEnvironment} from 'hardhat/types';
import type {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const {deployments, getNamedAccounts} = hre;
	const {deploy, execute} = deployments;

	const Factory = await deployments.getOrNull('ERC20PermitFactory');
	const {deployer} = await getNamedAccounts();

	// token factory
	if (!Factory) {
		// await deploy('ERC20PermitFactory', {
		// 	from: deployer,
		// 	log: true,
		// 	// speed up deployment on local network (ganache, hardhat), no effect on live networks
		// 	autoMine: true,
		// });
	}

	// erc20 permit
  // const receipt = await execute(
  //   'ERC20PermitFactory',
  //   {
  //     from: deployer,
  //   },
  //   'deploy',
  //   utils.hexZeroPad(utils.hexlify(1), 32),
  // );
	// console.log(receipt);
};

export default func;
func.tags = ['Factory'];
