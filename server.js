import express from "express";
import { Router} from 'express';
import http from "http";
import { Server as IOServer} from 'socket.io';
import comms from './sockets/comms.js';
import cors from "cors";
import * as dotenv from "dotenv";
import apiRoutes from "./routes/indexRoutes.js";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: "GET, POST, PUT, DELETE, OPTIONS",
    })
);
const PORT = 8080 || process.env.PORT;
const httpServer = http.createServer(app);
const io = new IOServer(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});
comms(io);

// const apiRoutes = new Router();

//app.use("/", apiRoutes);
app.use("/api", apiRoutes);


const server = app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}. at ${new Date().toLocaleString()}`)
});

server.on("error", (err) => {
    console.log(err);
})