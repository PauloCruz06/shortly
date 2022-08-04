import { Router } from "express";
import userTokenValidation from "../middlewares/tokenValidation.js";
import { postUrl } from "../controllers/usercontroller.js";

const userrouter = Router();

userrouter.post('/urls/shorten', userTokenValidation, postUrl);

export default userrouter;