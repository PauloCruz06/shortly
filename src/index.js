import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authrouter from "./routes/authrouter.js";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.use(authrouter);

server.listen(process.env.PORT, ()=>
    console.log("Server is listening on port.")
);