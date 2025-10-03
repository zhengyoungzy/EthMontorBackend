import provider from "../config/provider.js"
import { formatUnits } from "ethers";

function toGwei(bnLike) {
    if (bnLike == null) return null;
    try {
        return Number(formatUnits(bnLike, "gwei"));
    } catch {
        return null;
    }
}

export function startGasWatcher(onUpdate) {
    // 订阅区块号
    provider.on("block", async(blockNumber) => {
        try {
            const block = await provider.getBlock(blockNumber, false);
            const baseFeeGwei = toGwei(block.baseFeePerGas);

            const stat = {
                blockNumber,
                baseFeeGwei
            }

            if (typeof onUpdate === "function") {
                onUpdate(stat);
            }
        } catch (e) {
            console.error("[gasWatcher] error:", e?.message || e);
        }
    });

    console.log("[gasWatcher] started: listening new blocks...");
}