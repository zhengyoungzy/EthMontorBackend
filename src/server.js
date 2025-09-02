import { ethers } from 'ethers';
import app from './app.js';

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
console.log(process.env.RPC_URL);
app.get("/latest-block", async (req, res) => {
    try {
        const block = await provider.getBlock("latest");
        res.json(block);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log("Backend running on port " + process.env.PORT)
});

