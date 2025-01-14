import { task } from "hardhat/config";
import { isAddress } from "ethers/lib/utils";
import { pythContracts } from "../utils/pyth";

task(`deploy-pyth`)
  .addParam("priceid")
  .setAction(async ({ priceid }, hre) => {
    const pythContract = pythContracts[hre.network.name] as `0x${string}`;
    if (!isAddress(pythContract)) throw new Error("invalid address");

    const args: [`0x${string}`, `0x${string}`] = [pythContract, priceid];

    console.log("args", args);
    const contract = await hre.viem.deployContract("PythAggregatorV3", args);
    console.log(`deployed to`, contract.address);

    // verify contract for tesnet & mainnet
    if (process.env.NODE_ENV != "test") {
      // Verify contract programmatically
      await hre.run("verify:verify", {
        address: contract.address,
        constructorArguments: args,
      });
    } else {
      console.log(`Contract not verified, deployed locally.`);
    }
  });
