"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
_1.app.listen(_1.app.get("port"), () => {
    console.log(`Server started on port ${_1.app.get("port")}`);
});
