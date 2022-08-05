import { Router } from "express";
import userTokenValidation from "../middlewares/tokenValidation.js";
import { postUrl, deleteUrl } from "../controllers/usercontroller.js";

const userrouter = Router();

userrouter.use(userTokenValidation);
userrouter.post('/urls/shorten', postUrl);
userrouter.delete('/urls/:id', deleteUrl);

export default userrouter;