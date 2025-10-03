import http from "http";
import { ethers } from 'ethers';
import app from './app.js';
import { startGasWatcher } from "./services/gasWatcher.js";
import { WebSocketServer } from "ws";

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

function broadcast(obj) {
    const msg = JSON.stringify(obj);
    wss.clients.forEach((client) => {
        if (client.readyState === 1) client.send(msg);
    });
}

wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ type: "hello", ts: Date.now() }));

    // 心跳：服务器每 25s ping 一次，避免代理/ELB断链
    const ping = setInterval(() => {
        if (ws.readyState === 1) ws.ping();
    }, 25000);

    ws.on("close", () => clearInterval(ping));
});

startGasWatcher((stat) => {
    // 你也可以封装 type，以便前端区分消息类型
    broadcast({ type: "gas:update", payload: stat });
});

app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log("Backend running on port " + process.env.PORT)
});

