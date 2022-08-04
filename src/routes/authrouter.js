import { Router } from "express";
import { signup } from "../controllers/authcontroller.js";

const authrouter = Router();

authrouter.post('/signup', signup);

export default authrouter;