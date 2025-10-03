import { JsonRpcProvider, WebSocketProvider } from "ethers";
import dotenv from "dotenv";
dotenv.config();

let provider;

if (process.env.INFRA_WS_URL) {
    provider = new WebSocketProvider(process.env.INFRA_WS_URL);
    provider.on("error", (e) => console.error("[WS] provider error:", e));
} else if (process.env.RPC_URL) {
    provider = new JsonRpcProvider(process.env.RPC_URL);
} else {
    throw new Error("No RPC provider provided");
}

export default provider;