import { Router } from "express";
import userTokenValidation from "../middlewares/tokenValidation.js";
import { postUrl } from "../controllers/usercontroller.js";

const userrouter = Router();

userrouter.use(userTokenValidation);
userrouter.post('/urls/shorten', postUrl);

export default userrouter;