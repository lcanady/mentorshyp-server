"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
dotenv_1.default.config();
const app = express_1.default();
const server = http_1.createServer(app);
const io = socket_io_1.default(server);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server reached!" });
});
// Attach Socket.io to the server instance.
server.listen(process.env.PORT, () => console.log(`> Server Started on http://localhost:${process.env.PORT}`));
// Event handlers.
io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId);
        console.log("Connected ", userId);
        socket.broadcast.to(roomId).emit("user-connected", userId);
        socket.on("disconnect", () => {
            console.log("disconnected", userId);
            socket.broadcast.to(roomId).emit("user-disconnected", userId);
        });
    });
});
//# sourceMappingURL=index.js.map