const { WHITELIST_CONTRACT_ADDRESS, METADATA_URL, WHITELIST_CONTRACT_ADDRRESS } = require("../constants");
require("dotenv").config({ path: ".env" });
const { ethers } = require("hardhat");


async function main() {
    const nftContract = await ethers.getContractFactory("BkNFT")
    const deployedNftContract= await nftContract.deploy(METADATA_URL,WHITELIST_CONTRACT_ADDRRESS)
    await deployedNftContract.deployed()
    console.log(
        "NFT COLLECTION ADDRESS :",deployedNftContract.address
    )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
