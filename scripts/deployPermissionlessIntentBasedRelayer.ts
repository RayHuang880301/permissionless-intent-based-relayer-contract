import { ethers } from "hardhat";
import { PermissionlessIntentBasedRelayerFactory } from "../typechain-types";
import { getString } from "../utils/helper";
import { utils } from "ethers";
require("dotenv").config();

async function main() {
  const Factory = await ethers.getContractFactory(
    "PermissionlessIntentBasedRelayerFactory"
  );

  const factory =
    (await Factory.deploy()) as PermissionlessIntentBasedRelayerFactory;

  await factory.deployed();

  console.log("factory deployed to:", factory.address);

  const SALT = getString(process.env.SALT);
  const deployTx = await factory.deploy(
    utils.hexZeroPad(utils.hexlify(SALT), 32)
  );
  const receipt = await deployTx.wait();

  console.log(
    "PermissionlessIntentBasedRelayer deployed to:",
    receipt.events?.[0].args?.addr,
    "with salt:",
    receipt.events?.[0].args?.salt
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
