import { Router } from "express";
import { signup, signin } from "../controllers/authcontroller.js";

const authrouter = Router();

authrouter.post('/signup', signup);
authrouter.post('/signin', signin);

export default authrouter;