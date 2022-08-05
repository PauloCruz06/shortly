import { Router } from "express";
import userTokenValidation from "../middlewares/tokenValidation.js";
import {
    postUrl, deleteUrl, getUserLinks
} from "../controllers/usercontroller.js";

const userrouter = Router();

userrouter.use(userTokenValidation);
userrouter.post('/urls/shorten', postUrl);
userrouter.delete('/urls/:id', deleteUrl);
userrouter.get('/users/me', getUserLinks);

export default userrouter;