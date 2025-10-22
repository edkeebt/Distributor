
// Distributor/index.js
import { ethers } from "ethers";

async function distribute() {
  const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const distributor = new ethers.Contract(process.env.DISTRIBUTOR_ADDRESS, process.env.DISTRIBUTOR_ABI, wallet);

  const recipients = process.env.RECIPIENTS.split(",");
  const amount = ethers.parseUnits("10", 18);

  console.log("Distributing to", recipients.length, "recipients...");
  for (const addr of recipients) {
    const tx = await distributor.distributeToken(process.env.TOKEN_ADDRESS, addr, amount);
    console.log("Distributed to", addr, "tx:", tx.hash);
  }
}

distribute().catch(console.error);
