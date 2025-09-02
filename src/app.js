import dotenv from "dotenv"
import express from "express"
import cors from "cors"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.json({ message: "Ethereum Monitor Backend is running 🚀" });
});

export default app;