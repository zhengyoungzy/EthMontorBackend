import { Router } from "express";
import provider from "../config/provider.js";

const router = Router();
router.get("/latest-block", async (_req, res) => {
    try {
        const block = await provider.getBlock("latest");
        res.json(block);
    } catch (err) {
        res.status(500).json({ error: err?.message || String(err) });
    }
});

export default router;