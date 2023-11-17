import { expect } from "chai";
import { ethers } from "hardhat";
import { ERC20Permit, ERC20PermitMock } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, utils } from "ethers";

describe("ERC20Permit", function () {
  let ERC20PermitMock: ERC20PermitMock;
  let owner: SignerWithAddress;
  let spender: SignerWithAddress;

  beforeEach(async function () {
    [owner, spender] = await ethers.getSigners();
    const ERC20PermitMockFactory = await ethers.getContractFactory(
      "ERC20PermitMock"
    );
    ERC20PermitMock = await ERC20PermitMockFactory.deploy(
      "ERC20PermitMock",
      "ERC20PermitMock"
    );
    await ERC20PermitMock.deployed();
    ERC20PermitMock.mint(owner.address, utils.parseEther("1000"));
  });

  it("permit", async function () {
    const value = utils.parseEther("100");
    const deadline = ethers.constants.MaxUint256;

    const { v, r, s } = utils.splitSignature(
      await owner._signTypedData(
        {
          name: await ERC20PermitMock.name(),
          version: "1",
          chainId: await owner.getChainId(),
          verifyingContract: ERC20PermitMock.address,
        },
        {
          Permit: [
            {
              name: "owner",
              type: "address",
            },
            {
              name: "spender",
              type: "address",
            },
            {
              name: "value",
              type: "uint256",
            },
            {
              name: "nonce",
              type: "uint256",
            },
            {
              name: "deadline",
              type: "uint256",
            },
          ],
        },
        {
          owner: owner.address,
          spender: spender.address,
          value,
          nonce: await ERC20PermitMock.nonces(owner.address),
          deadline,
        }
      )
    );

    await ERC20PermitMock.permit(
      owner.address,
      spender.address,
      value,
      deadline,
      v,
      r,
      s
    );

    expect(
      await ERC20PermitMock.allowance(owner.address, spender.address)
    ).to.equal(value);
  });
});
