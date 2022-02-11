"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./constant");
const Post_1 = require("./entities/Post");
const posix_1 = __importDefault(require("path/posix"));
const User_1 = require("./entities/User");
exports.default = {
    migrations: {
        path: posix_1.default.join(__dirname, '/migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post_1.Post, User_1.User],
    dbName: "postgres",
    type: "postgresql",
    debug: !constant_1.__prod__,
    user: "postgres",
    password: "postgres",
};
//# sourceMappingURL=mikro-orm.config.js.map