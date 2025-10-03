import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import gasRoutes from "./routes/blockRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/gas", gasRoutes);
// Root route
app.get("/", (req, res) => {
    res.json({ message: "Ethereum Monitor Backend is running 🚀" });
});

export default app;