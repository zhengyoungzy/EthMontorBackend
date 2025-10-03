import http from "http";
import app from './app.js';
import { initGasWs } from "./ws/gasWs.js";

const server = http.createServer(app);
initGasWs(server);

server.listen(process.env.PORT, "0.0.0.0", () => {
    console.log("Backend running on port " + process.env.PORT)
});

