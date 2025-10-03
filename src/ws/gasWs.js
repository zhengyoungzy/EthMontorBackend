import { WebSocketServer } from "ws";
import { startGasWatcher } from "../services/gasWatcher.js";

export function initGasWs(server) {
    const wss = new WebSocketServer({ server, path: "/ws/gas" });

    wss.on("connection", (ws) => {
        ws.send(JSON.stringify({ type: "hello", from: "gasWs" }));
    });

    startGasWatcher((data) => {
        const msg = JSON.stringify({ type: "gas_update", ...data });
        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(msg);
            }
        });
    });

    return wss;
}