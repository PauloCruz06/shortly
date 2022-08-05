import { Router } from "express";
import { getUrl, openUrl } from "../controllers/generalcontroller.js";

const generalrouter = Router();

generalrouter.get('/urls/:id', getUrl);
generalrouter.get('/urls/open/:shortUrl', openUrl);

export default generalrouter;