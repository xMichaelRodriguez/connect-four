"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = void 0;
const listen = (io, _) => {
    io.emit("message", "Hello from server");
};
exports.listen = listen;
