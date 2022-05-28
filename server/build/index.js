"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const colaRoute_1 = require("./routes/colaRoute");
// config
exports.app = (0, express_1.default)();
const server = http_1.default.createServer(exports.app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    },
});
dotenv_1.default.config();
exports.app.set("port", process.env.PORT || 3000);
// middlewares
exports.app.use(express_1.default.json());
//socket.io
io.on("connection", (socket) => {
    // colaRoute
    (0, colaRoute_1.listen)(io, socket);
});
