"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// const pg = new Client(
//   "postgresql://neondb_owner:npg_f2BsjLc5WtZk@ep-polished-river-a8tubr59-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require"
// );
const pgClient2 = new pg_1.Client({
    user: "neondb_owner",
    password: "npg_f2BsjLc5WtZk",
    port: 5432,
    host: "ep-polished-river-a8tubr59-pooler.eastus2.azure.neon.tech",
    database: "neondb",
    ssl: { rejectUnauthorized: false },
});
pgClient2.connect();
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const response = yield pgClient2.query(`INSERT INTO users (username , email, password) VALUES ('${username}' , '${email}' , '${password}');`);
    res.json({
        message: "You have signed up",
    });
}));
app.listen(3000);
